const fs = require("fs")
const path = require("path")

const filePath = path.join(
  process.cwd(),
  "node_modules",
  "@sgftech",
  "payment-razorpay",
  "dist",
  "core",
  "razorpay-base.js"
)

try {
  if (!fs.existsSync(filePath)) {
    console.log("❌ razorpay-base.js not found")
    process.exit(1)
  }

  let content = fs.readFileSync(filePath, "utf8")

  // Replace exact code
  content = content.replace(
    "        const { extra } = input.context;",
    "        const { extra } = input.data;"
  )

  fs.writeFileSync(filePath, content)

  console.log("✅ Razorpay package patched successfully")
} catch (err) {
  console.error("❌ Failed to patch Razorpay package")
  console.error(err)
}