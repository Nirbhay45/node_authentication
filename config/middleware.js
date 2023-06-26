// SETTING UP FLASH MESSAGES
// FOR ERROR AND SUCCESS CODES
module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}