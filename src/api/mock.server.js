import { createServer, RestSerializer, Model } from "miragejs";

import faker from "faker";

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
      [...Array(50)].map((item) => {
        return server.create("product", {
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            desc: faker.commerce.productDescription(),
            image: faker.random.image(),
            price: faker.commerce.price(),
            actualPrice: faker.random.arrayElement([1999, 2999, 4999]),
            material: faker.commerce.productMaterial(),
            brand: faker.random.arrayElement([
              "Bata",
              "Reebok",
              "Nike",
              "Addidas",
              "Puma"
            ]),
            isWishlist: false,
            isAddedToCart: false,
            inStock: faker.random.boolean(),
            fastDelivery: faker.random.boolean(),
            ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
            offer: faker.random.arrayElement([
            "Save 50",
            "70% bonanza",
            "Republic Day Sale",
            ]),
            idealFor: faker.random.arrayElement([
            "Men",
            "Women",
            "Girl",
            "Boy",
            "Senior",
            ]),
            level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional",
            ]),
            color: faker.commerce.color(),
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

        this.post("/api/addToCart", (schema, request) => {
          let cartItem = JSON.parse(request.requestBody);

          if (schema.carts.find(cartItem.id)) {
            let cartItemToUpdate = schema.carts.find(cartItem.id);
            return cartItemToUpdate.update({
              quantity: cartItemToUpdate.quantity + 1,
            });
          } else {
            cartItem.quantity = 1;
            return schema.carts.create(cartItem);
          }
        })
    }
  });
}
