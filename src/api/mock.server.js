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
        server.create("product", {
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            image: faker.random.image(),
            price: faker.commerce.price(),
            material: faker.commerce.productMaterial(),
            brand: faker.lorem.word(),
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
    }
  });
}
