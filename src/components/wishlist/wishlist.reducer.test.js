import wishlistReducer from "./wishlist.reducer";

describe("testing wishlist", () => {
  test("it should set wishlist id", () => {
    const initialState = {
      wishlistId: "",
      wishlist: [],
    };

    const action = {
      type: "SET_WISHLIST_ID",
      payload: { wishlistId: 22123 },
    };

    const state = wishlistReducer(initialState, action);

    expect(state).toEqual({
      wishlistId: 22123,
      wishlist: [],
    });
  });

  test("it should load data coming from the api", () => {
    const initialState = {
      wishlistId: 22123,
      wishlist: [],
    };

    const action = {
      type: "LOAD_DATA",
      payload: {
        wishlistData: [
          {
            _id: 333,
            product: {
              _id: 111,
              name: "guitar",
              price: 19999,
              category: "music",
            },
            visible: true,
          },
        ],
      },
    };

    const state = wishlistReducer(initialState, action);

    expect(state).toEqual({
      wishlistId: 22123,
      wishlist: [
        {
          _id: 333,
          product: {
            _id: 111,
            name: "guitar",
            price: 19999,
            category: "music",
          },
          visible: true,
        },
      ],
    });
  });

  test("should add a new item to playlist if it was never present before", () => {
    const initialState = {
      wishlistId: 22123,
      wishlist: [],
    };

    const action = {
      type: "ADD_NEWITEM_TO_WISHLIST",
      payload: {
        product: {
          _id: 111,
          name: "guitar",
          price: 19999,
          category: "music",
        },
      },
    };

    const state = wishlistReducer(initialState, action);

    expect(state).toEqual({
      wishlistId: 22123,
      wishlist: [
        {
          product: {
            _id: 111,
            name: "guitar",
            price: 19999,
            category: "music",
          },
          visible: true,
        },
      ],
    });
  });

  test("should change the visibility state if item already exists in wishlist and is invisible", () => {
      const initialState = {
        wishlistId: 22123,
        wishlist: [
          {
            _id: 333,
            product: {
              _id: 111,
              name: "guitar",
              price: 19999,
              category: "music",
            },
            visible: false,
          },
        ],
      };

      const action = {
        type: "ADD_EXISTING_TO_WISHLIST",
        payload: { wishlistItemId: 333 }
      };

      const state = wishlistReducer(initialState, action)

      expect(state).toEqual({
        wishlistId: 22123,
        wishlist: [
          {
            _id: 333,
            product: {
              _id: 111,
              name: "guitar",
              price: 19999,
              category: "music",
            },
            visible: true,
          },
        ],
      });
  })

  test("should change the item's visible status when remove is dispatched", () => {
      const initialState = {
        wishlistId: 22123,
        wishlist: [
          {
            _id: 333,
            product: {
              _id: 111,
              name: "guitar",
              price: 19999,
              category: "music",
            },
            visible: true,
          },
        ],
      };

      const action = {
        type: "REMOVE_FROM_WISHLIST",
        payload: { wishlistItemId: 333 }
      };

      const state = wishlistReducer(initialState, action)

      expect(state).toEqual({
        wishlistId: 22123,
        wishlist: [
          {
            _id: 333,
            product: {
              _id: 111,
              name: "guitar",
              price: 19999,
              category: "music",
            },
            visible: false,
          },
        ],
      });
  })
});
