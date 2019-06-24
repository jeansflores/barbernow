const { User, Appointment } = require('../models')

class AppointmentController {
  async new (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/new', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date: date
    })

    req.flash('success', 'Agendamento realizado com sucesso!')

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
