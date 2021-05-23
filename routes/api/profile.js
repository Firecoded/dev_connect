const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const request = require("request");
const config = require("config");
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
        if (!profile) return res.status(400).json({ message: "Profile not found" });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ message: "Profile not found" });
        }
        res.status(500).send("Server error");
    }
});

// @route DELETE api/profile
// @desc Delete profile, user  & posts
// @access Private

router.delete("/", auth, async (req, res) => {
    try {
        // TODO: remove users posts
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ message: "User removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private

router.put(
    "/experience",
    [
        auth,
        [
            check("title", "Title is required").not().isEmpty(),
            check("company", "Company is required").not().isEmpty(),
            check("from", "From date is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, company, location, from, to, current, description } = req.body;
            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description,
            };
            try {
                const profile = await Profile.findOne({ user: req.user.id });
                profile.experience.unshift(newExp);
                await profile.save();
                res.json(profile);
            } catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @route DELETE api/profile/experience/:exp_id
// @desc Remove a profile experience
// @access Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.experience.map((e) => e.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route PUT api/profile/education
// @desc Add profile education
// @access Private

router.put(
    "/education",
    [
        auth,
        [
            check("school", "School is required").not().isEmpty(),
            check("degree", "Degree is required").not().isEmpty(),
            check("from", "From date is required").not().isEmpty(),
            check("fieldofstudy", "Field of study is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { school, degree, fieldofstudy, from, to, current, description } = req.body;
            const newEdu = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description,
            };
            try {
                const profile = await Profile.findOne({ user: req.user.id });
                profile.education.unshift(newEdu);
                await profile.save();
                res.json(profile);
            } catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @route DELETE api/profile/education/:edu_id
// @desc Remove a profile education
// @access Private

router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map((e) => e.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/profile/github/:username
// @desc Get user repos from ghub
// @access Public

router.get("/github/:username", (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get(
                "githubSecret"
            )}`,
            method: "GET",
            headers: { "user-agent": "node.js" },
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ message: "No github profile found" });
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
