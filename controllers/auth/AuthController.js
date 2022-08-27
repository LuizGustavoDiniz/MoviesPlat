const bcrypt = require('bcryptjs')
const userModel = require('../../models/User')

module.exports = class AuthController{

    static login(req, res){
        res.render('auth/login')
    }

    static async signIn(req, res){
        const { email, password } = req.body

        const user = await userModel.findOne({where: {email: email}})

        if(!user){
            req.flash("msg", "usuário inexistente!")
            res.render('auth/login')
            return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            req.flash("msg", "Email ou senha incorretos!")
            res.render('auth/login')
            return
        }

        req.session.userid = user.id

        req.flash("msg", "Autenticação feita com sucesso!")

        req.session.save(()=>{
            res.redirect('/movies')
        })

    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerCreate(req, res){
        const { name, email, password, confirmpassword } = req.body

        if(password != confirmpassword){
            req.flash("msg", "senhas não batem")
            res.render('auth/register')
            return
        }
        
       const userAlreadyExists = await userModel.findOne({where: {email: email}})

       if(userAlreadyExists){
            req.flash("msg", "o email já existe!")
            res.render('auth/register')
            return
       }

       let salt = bcrypt.genSaltSync(10)
       let hashedPassword = bcrypt.hashSync(password, salt)

       const user = {
          name,
          email,
          password: hashedPassword
       }


        try {
            
          const savedUser =  await userModel.create(user)

            req.session.userid = savedUser.id

            console.log(req.session.userid)

            req.flash("msg", "Usuário cadastrado com sucesso!")

            req.session.save(() => {
                res.redirect('/movies')
            })

        } catch (error) {
            console.log('algum erro'+ error)
        }
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
}