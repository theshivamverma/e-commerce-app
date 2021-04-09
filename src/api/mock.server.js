import { createServer, RestSerializer, Model } from "miragejs";

import faker from "faker";

import data from "./data"

export default function mockServer() {
  createServer({
    serializers: {
      product: RestSerializer,
    },

    models: {
      product: Model,
      cart: Model,
    },

    seeds(server) {
      data.map((product) => {
        return server.create("product", {
            ...product,
            isWishlist: false,
            isAddedToCart: false
        })
      });
    },

    routes(){
        this.get("/api/products", (schema) => {
          return schema.products.all()
        })

        this.get("/api/cart", (schema) => {
          return schema.carts.all()
        })

        this.post("/api/addToWishList", (schema, request) => {
          let productItem = JSON.parse(request.requestBody)
          if(schema.products.find(productItem.id)){
            let productToUpdate = schema.products.find(productItem.id)
            return productToUpdate.update({
              isWishlist: !productToUpdate.isWishlist
            })
          }
        })

        this.post("/api/addToCart", (schema, request) => {
          let cartItem = JSON.parse(request.requestBody);
          let productItemToUpdate = schema.product.find(cartItem.id);
          productItemToUpdate.update({
            isAddedToCart: true
          })
          return schema.carts.create(cartItem);
        });

        this.post("/api/increaseCartQuantity", (schema, request) => {
          let cartItem = JSON.parse(request.requestBody);

          if (schema.carts.find(cartItem.id)) {
            let cartItemToUpdate = schema.carts.find(cartItem.id);
            return cartItemToUpdate.update({
              quantity: cartItemToUpdate.quantity + 1,
            });
          } 
        });

        this.post("/api/decreaseCartQuantity", (schema, request) => {
          let cartItem = JSON.parse(request.requestBody);

          if (schema.carts.find(cartItem.id)) {
            let cartItemToUpdate = schema.carts.find(cartItem.id);
            return cartItemToUpdate.update({
              quantity: cartItemToUpdate.quantity - 1,
            });
          }
        });
        
    }
  });
}
