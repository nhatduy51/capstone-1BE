module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blog", {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    category: {
      type: Sequelize.STRING
    }
  });
  
  return Blog;
};
