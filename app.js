const Replicate = require('replicate');
const express = require('express');
const { db } = require('./firebase');
const port = 3000; // or any port you prefer
app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const replicate = new Replicate({
    auth: "r8_QYTENO4WMfrLI2NX6FNZlVLDRKjBd693MR1Gh",
});

app.post('/replicate/sticker', async (req, res) => {
    try {
        const { userId, steps, width, height, prompt, upscale, upscale_steps, negative_prompt } = req.body;

        const output = await replicate.run(
            "fofr/sticker-maker:58a7099052ed9928ee6a65559caa790bfa8909841261ef588686660189eb9dc8",
            {
                input: {
                    steps: steps || 20,
                    width: width || 1024,
                    height: height || 1024,
                    prompt: prompt || "a cute cat",
                    upscale: upscale || true,
                    upscale_steps: upscale_steps || 10,
                    negative_prompt: negative_prompt || ""
                }
            }
        );
        console.log(output);
        res.json({ success: true, output });
    } catch (error) {
        console.error('Error triggering replicate:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
