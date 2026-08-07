const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedAdmin = async () => {
    try {

        const admin = await User.findOne({
            email: "admin@gmail.com"
        });

        if (!admin) {

            const hashedPassword = await bcrypt.hash("123456", 10);

            await User.create({
                name: "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "admin"
            });

            console.log("Default Admin Created");

        } else {

            console.log("Admin Already Exists");

        }

    } catch (error) {

        console.log(error.message);

    }
};

module.exports = seedAdmin;