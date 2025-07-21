const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🟢 API Online");
});

app.get("/api/getConfigs", async (req, res) => {
  const subLink = "https://raw.githubusercontent.com/..."; // اینجا لینک واقعی ساب‌لینکتو بذار

  try {
    const response = await fetch(subLink);
    const raw = await response.text();
    const decoded = Buffer.from(raw, "base64").toString("utf-8");
    const lines = decoded.split("\n").filter(l => l.startsWith("vmess://")).slice(0, 5);

    res.json({
      ok: true,
      configs: lines,
    });
  } catch (err) {
    res.json({ ok: false, error: "⚠️ خطا در دریافت کانفیگ." });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
