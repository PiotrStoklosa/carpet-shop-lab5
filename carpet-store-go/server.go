package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Carpet struct {
	ID          uint   `gorm:"primaryKey"`
	Shape       string `gorm:"not null"`
	Color       string `gorm:"not null"`
	Material    string `gorm:"not null"`
	Image       string `gorm:"not null"`
	Description string `gorm:"not null"`
	Price       int    `gorm:"not null"`
}

type CartCarpet struct {
	Carpet   Carpet `json:"carpet"`
	Quantity int    `json:"quantity"`
}

type Order struct {
	ShippingAddress string       `json:"shippingAddress"`
	Email           string       `json:"email"`
	Blik            string       `json:"blik"`
	Cart            []CartCarpet `json:"cart"`
}

func setCORSHeader(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		c.Response().Header().Set("Access-Control-Allow-Origin", "*")
		c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		return next(c)
	}
}

func main() {
	db, err := gorm.Open(sqlite.Open("carpet.db"))
	if err != nil {
		panic("failed to connect database")
	}

	err = db.AutoMigrate(&Carpet{})
	if err != nil {
		return
	}

	e := echo.New()
	e.Use(setCORSHeader)
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("db", db)
			return next(c)
		}
	})

	e.GET("/carpets", getCarpets)
	e.GET("/carpets/:id", getCarpet)
	e.PUT("/carpets/:id", updateCarpet)
	e.POST("/carpets", createCarpet)
	e.DELETE("/carpets/:id", deleteCarpet)

	e.POST("/carpets/order", orderCarpets)

	e.Logger.Fatal(e.Start(":8080"))
}

func orderCarpets(c echo.Context) error {
	var order Order
	if err := c.Bind(&order); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, order)
}

func getCarpets(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	var carpets []Carpet
	db.Find(&carpets)
	return c.JSON(http.StatusOK, carpets)
}

func getCarpet(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	id, _ := strconv.Atoi(c.Param("id"))
	var carpet Carpet
	db.First(&carpet, id)
	return c.JSON(http.StatusOK, carpet)
}

func updateCarpet(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	id, _ := strconv.Atoi(c.Param("id"))
	var carpet Carpet
	if err := db.First(&carpet, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "carpet not found"})
	}
	if err := c.Bind(&carpet); err != nil {
		return err
	}
	db.Save(&carpet)
	return c.JSON(http.StatusOK, carpet)
}

func createCarpet(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	carpet := new(Carpet)
	if err := c.Bind(carpet); err != nil {
		return err
	}
	db.Create(&carpet)
	return c.JSON(http.StatusCreated, carpet)
}

func deleteCarpet(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	id, _ := strconv.Atoi(c.Param("id"))
	var carpet Carpet
	if err := db.First(&carpet, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "carpet not found"})
	}
	db.Delete(&carpet)
	return c.NoContent(http.StatusNoContent)
}
