const WishList = require("../Models/WishList");

// 1. Get WishList____________________
exports.getWishList = async (req, res) => {
    const userId = req.user._id

    try {

        const wishLists = await WishList.find({ userId })
        res.status(200).json({
            status: "success",
            messgae: "WishLists fetched successfully!",
            wishLists,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Add to WishList____________________
exports.addToWishList = async (req, res) => {
    const userId = req.user._id
    const foodId = req.params.foodId
    const wishListData = { userId, foodId }

    try {
        const exist = await WishList.findOne({ userId, foodId })
        if (exist) {
            return res.status(400).json({
                status: "fail",
                error: "Already added to the wishlist",
            });
        }

        const wishList = await WishList.create(wishListData)
        res.status(200).json({
            status: "success",
            messgae: "WishList created successfully!",
            wishList,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Remove from WishList____________________
exports.removeFromWishList = async (req, res) => {
    const userId = req.user._id
    const foodId = req.params.foodId

    try {
        const exist = await WishList.findOne({ userId, foodId })
        if (!exist) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find the data to delete",
            });
        }

        const wishList = await WishList.deleteOne({ userId, foodId })

        if (!wishList.acknowledged) {
            console.log(wishList);
            return res.status(400).json({
                status: "fail",
                error: "WishList Couldn't delete",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "WishList deleted successfully!",
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}