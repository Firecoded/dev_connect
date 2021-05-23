const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ message: "There is no profile for this user" });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sevrer error");
    }
});

// @route POST api/profile/
// @desc Create or update user profile
// @access Private
router.post(
    "/",
    [
        auth,
        [check("status", "Status is required").not().isEmpty(), check("skills", "Skills is required").not().isEmpty()],
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {
                company,
                website,
                location,
                bio,
                status,
                githubusername,
                skills,
                youtube,
                facebook,
                twitter,
                instagram,
                linkedin,
            } = req.body;

            // Build profile obj
            const addToFields = (key, value, destObj) => {
                if (value) destObj[key] = value;
            };

            const profileFields = { user: req.user.id };
            addToFields("company", company, profileFields);
            addToFields("website", website, profileFields);
            addToFields("location", location, profileFields);
            addToFields("bio", bio, profileFields);
            addToFields("status", status, profileFields);
            addToFields("githubusername", githubusername, profileFields);
            if (skills) {
                profileFields.skills = skills.split(",").map((s) => s.trim());
            }
            // build social links
            profileFields.social = {};
            addToFields("youtube", youtube, profileFields.social);
            addToFields("twitter", twitter, profileFields.social);
            addToFields("facebook", facebook, profileFields.social);
            addToFields("linkedin", linkedin, profileFields.social);
            addToFields("instagram", instagram, profileFields.social);

            try {
                let profile = await Profile.findOne({ user: req.user.id });
                if (profile) {
                    //update profile
                    profile = await Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    );
                    return res.json(profile);
                }
                //create
                profile = new Profile(profileFields);
                await profile.save();
                res.json(profile);
            } catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Sevrer error");
        }
    }
);

// @route GET api/profile
// @desc Get all profiles
// @access Public

router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public

router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
        if (!profile) return res.status(400).json({ message: "No profile for this user" });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ message: "No profile for this user" });
        }
        res.status(500).send("Server error");
    }
});

module.exports = router;
