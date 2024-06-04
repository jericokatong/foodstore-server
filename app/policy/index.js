const {
  AbilityBuilder,
  Ability,
  createMongoAbility,
} = require("@casl/ability");

const policies = {
  guest(user, { can }) {
    can("read", "Product");
  },

  user(user, { can }) {
    // membaca daftar order
    can("view", "Order");

    // membuat order
    can("create", "Order");

    // membaca order miliknya
    can("read", "Order", { user_id: user._id });

    // mengupdate data dirinya sendiri
    can("update", "User", { _id: user._id });

    // membaca cart miliknya
    can("read", "Cart", { user_id: user.id });

    // mengupdate cart miliknya
    can("update", "Cart", { user_id: user.id });

    // melihat daftar delivery address
    can("view", "DeliveryAddress");

    // membuat delivery address
    can("create", "DeliveryAddress");

    // membaca delivery address miliknya
    can("read", "DeliveryAddress", { user_id: user._id });

    // mengupdate delivery address miliknya
    can("update", "DeliveryAddress", { user_id: user._id });

    // menghapus delivery address miliknya
    can("delete", "DeliveryAddress", { user_id: user._id });

    // membaca invoice miliknya
    can("read", "Invoice", { user_id: user._id });
  },

  admin(user, { can }) {
    can("manage", "all");
  },
};

const policyFor = (user) => {
  // let builder = new AbilityBuilder();
  let builder = new AbilityBuilder(createMongoAbility);

  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }

  return builder.build();
};

module.exports = {
  policyFor,
};
