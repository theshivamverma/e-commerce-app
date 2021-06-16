import cartReducer from "./cart.reducer";

describe("testing cart functionality", () => {

  test("should set the cart id", () => {
    const initialState = {
      cartId: "",
      cart: []
    }

    const action = {
      type: "SET_CART_ID",
      payload: { cartId: 11234 }
    };

    const state = cartReducer(initialState, action)

    expect(state).toEqual({
      cartId: 11234,
      cart : []
    })
  })

  test("it should the load the data coming from backend", () => {
    const initialState = {
      cartId: 11234,
      cart: [],
    };

    const action = {
      type: "LOAD_DATA",
      payload: { cartData: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: true,
        },
      ] }
    };

    const state = cartReducer(initialState, action)

    expect(state).toEqual({
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: true,
        },
      ]
    });
  })

  test("it should add to cart when new item is added", () => {
    const initialState = {
      cartId: 11234,
      cart: [],
    };

    const action = {
      type: "ADD_TO_CART",
      payload: {
        product: { _id: 111, name: "guitar", price: 19999, category: "music" },
      },
    };

    const state = cartReducer(initialState, action);

    expect(state).toEqual({
      cartId: 11234,
      cart: [
        {
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: true,
        },
      ],
    });
  });

  test("it should change visibility to false if item is removed", () => {
    const initialState = {
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: true,
        },
      ],
    };
    
    const action = {
      type: "REMOVE_CART_ITEM",
      payload: { cartItemId: 333 }
    };

    const state = cartReducer(initialState, action)

    expect(state).toEqual({
      cartId: 11234,
      cart: [
        {
          _id: 333,  
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: false,
        },
      ],
    });
  });

  test("it should change the visibility mode of item if it was alrady present but removed by user", () => {
    const initialState = {
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: false,
        },
      ],
    };
    const action = {
      type: "ADD_EXISTING_TO_CART",
      payload: { cartItemId: 333 }
    };
    const state = cartReducer(initialState, action)

    expect(state).toEqual({
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: true,
        },
      ],
    })
  })

  test("should increment quantity when dispatched", () => {
    const initialState = {
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: true,
        },
      ],
    }

    const action = {
      type: "INCREASE_QUANTITY",
      payload: { cartItemId: 333 }
    };

    const state = cartReducer(initialState, action)

    expect(state).toEqual({
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 2,
          visible: true,
        },
      ],
    })
  })

  test("should decrease quantity when dispatched", () => {
    const initialState = {
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 2,
          visible: true,
        },
      ],
    }

    const action = {
      type: "DECREASE_QUANTITY",
      payload: { cartItemId: 333 }
    };

    const state = cartReducer(initialState, action)

    expect(state).toEqual({
      cartId: 11234,
      cart: [
        {
          _id: 333,
          product: { _id: 111, name: "guitar", price: 19999, category: "music" },
          quantity: 1,
          visible: true,
        },
      ],
    })
  })
});
