function getAllCategories(mealKits) {
    const categories = new Set();
    mealKits.forEach(mealKit => {
        categories.add(mealKit.category);
    });
    return Array.from(categories);
}

module.exports ={
    getAllCategories
}