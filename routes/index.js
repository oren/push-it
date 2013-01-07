module.exports = indexPage;

function indexPage (req, res) {
    var locals = {
      title: 'npm',
      totalPackages: 121
    }
    res.template("index.ejs", locals)
};
