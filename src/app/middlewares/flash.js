module.exports = (req, res, next) => {
  console.log(req.flash)
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
}
