const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  completion_percentage: { type: Number, required: true }
});

const preparationStepSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  description: { type: String, required: true }
});

// Adjusted schema without percentage for fats and proteins
const nutritionDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true }
  // Removed the percentage requirement
});

const nutritionInfoSchema = new mongoose.Schema({
  total_calories: { type: Number, required: true },
  calories: [nutritionDetailSchema],
  total_fats: { type: String, required: true },
  percentage: { type: Number, required: true }, // This applies to total fats
  fats: [nutritionDetailSchema], // Individual fats no longer expect a percentage
  total_proteins: { type: String, required: true },
  proteins: [nutritionDetailSchema] // Same adjustment for proteins
});

const pricingInfoSchema = new mongoose.Schema({
  price: { type: String, required: true },
  discount: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  servings: { type: Number, required: true },
  calories: { type: Number, required: true },
  preparation_time: { type: String, required: true },
  difficulty: { type: String, required: true },
  ingredients: [ingredientSchema],
  preparation_step: [preparationStepSchema],
  nutrition_section: {
    calorie_info: {
      total_calories: { type: Number, required: true },
      calories: [nutritionDetailSchema]
    },
    fat_info: {
      total_fats: { type: String, required: true },
      percentage: { type: Number, required: true },
      fats: [nutritionDetailSchema]
    },
    protein_info: {
      total_proteins: { type: String, required: true },
      proteins: [nutritionDetailSchema]
    }
  },
  pricing_info: pricingInfoSchema
}, { timestamps: true });

module.exports = mongoose.model("Recipe", productSchema);
