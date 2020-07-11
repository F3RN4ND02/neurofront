import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import logo from '../../../img/MD1.svg'
import Typography from '@material-ui/core/Typography'
import{ Chip, CssBaseline }from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import GenderPicker from '../../../components/UI/Pickers/GenderPicker/GenderPicker'


import * as actions from '../../../store/actions/index';
import transitions from '@material-ui/core/styles/transitions'

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    background: '#ffff',
    borderRadius: "0.5rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    fontSize: theme.typography.pxToRem(20),
    margin: theme.spacing(4, 0, 2),
    text: theme.palette.button, 
    backgroundColor: '#2EF2F2'
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.h2,
  },
  img: {
    marginTop: theme.spacing(4),
    width: '65%'
  },
  title: {
    alignText: 'center',
    margin: theme.spacing(4, 0 ,2)
  }
});
class Register extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: '',
    username: '',
    first_name: '',
    last_name: '',
    role: '',
    document: '',
    gender: '',
  }
    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
       e.preventDefault()
       
       const newUser = {
          ...this.state
       }
       this.props.onRegister(newUser)
       
    }
      
    render() {
        const { classes } = this.props;

        let cargando = null
        if(this.props.loading) {
          cargando= <Alert variant="filled" severity="success">
          This is a success alert — check it out!
        </Alert>
        }

        let authRedirect = null
        if(this.props.registrationCompleted) {
          authRedirect = <Redirect to={"/login"} />
        }
       

        const handleClose = () => {
          this.setState({ generoOpen: false})
        };

        const handleOpen = () => {
          this.setState({ generoOpen: true})
        };
        const handleCloseRole = () => {
          this.setState({ roleOpen: false})
        };

        const handleOpenRole = () => {
          this.setState({ roleOpen: true})
        };
        return (
              <Container component="main" maxWidth="sm" className={classes.paper}>
             <CssBaseline />     
             <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  alignContent="center"
                  wrap="nowrap"
                  
                >
                <img src={logo} className={classes.img} alt="registerlogo"/>
                </Grid>
                <form onSubmit={this.onSubmit} style={useStyles.form}>
                
                <Typography variant="h4" color="initial" align="center" className={classes.title}>Crea una cuenta y disfruta de nuestros servicios</Typography>
                    <Grid container spacing={1}>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                          <Typography variant="subtitle2" color="initial">Nombres</Typography>
                        <TextField
                                id="first"
                                
                                value={this.state.first_name}
                                onChange={this.onChange}
                                type="text"
                                htmlFor="name"
                                name="first_name"
                                variant="outlined"
                                fullWidth
                                required
                                autoComplete="true"
                                autoCapitalize="true"
                                autoFocus
                                placeholder="Ingrese su nombre"
                                size="small"
                                error={Boolean(this.props.errors?.first_name)}
                                helperText={this.props.errors?.first_name ? this.props.errors?.first_name[0] : ""}
                                />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Typography variant="subtitle2" color="initial">Apellidos</Typography>
                        <TextField
                                id="last"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                type="text"
                                htmlFor="name"
                                name="last_name"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="true"
                                autoCapitalize="true"
                                size="small"
                                placeholder="Ingrese su apellido"
                                error={Boolean(this.props.errors?.last_name)}
                                helperText={this.props.errors?.last_name ? this.props.errors?.last_name[0] : ""}
                                />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="subtitle2" color="initial">Género</Typography>
                        <TextField className="csex"
                          id="gender"
                          name="gender"
                          required
                          select
                          size="small"
                          variant='outlined'
                          fullWidth
                          value={this.state.gender}
                          onChange={this.onChange}
                          error={Boolean(this.props.errors?.gender)}
                          helperText={this.props.errors?.gender ? 'Debe seleccionar su género' : null }        
                        >
                            <MenuItem value={"m"}>
                              {"Masculino"}
                            </MenuItem>
                            <MenuItem value={"f"}>
                              {"Femenino"}
                            </MenuItem>
                        
                        </TextField>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="subtitle2" color="initial">Cédula</Typography>
                        <TextField
                                id="id"
                                value={this.state.document}
                                onChange={this.onChange}
                                htmlFor="number"
                                name="document"
                                fullWidth
                                variant="outlined"
                                required
                                inputProps={{ type: 'number', pattern: '[0-9]*'}}
                                autoComplete="true"
                                autoCapitalize="true"
                                size="small"
                                placeholder="Indique su documento"
                                error={Boolean(this.props.errors?.document)}
                                helperText={this.props.errors?.document ? this.props.errors?.document[0] : ""}
                                />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="subtitle2" color="initial">Área de estudio</Typography>
                        <Autocomplete
                          multiple
                          size='small'
                          id="tags-filled"
                          variant='outlined'
                          filterSelectedOptions

                          options={top100Films.map((option) => option.title)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip color='primary' label={option} {...getTagProps({ index })} />
                            ))
                          }        
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" placeholder="Área de estudio" />
                          )}
                        />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="subtitle2" color="initial">Tipo de usuario</Typography>
                        <TextField className="csex"
                          id="gender"
                          name="role"
                          required
                          select
                          size="small"
                          variant='outlined'
                          fullWidth
                          value={this.state.role}
                          onChange={this.onChange}
                          error={Boolean(this.props.errors?.role)}
                          helperText={this.props.errors?.role ? 'Debe seleccionar su tipo de usuario' : null }  
                        >
                            <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                            <MenuItem value={"Medico"}>Médico</MenuItem>
                            <MenuItem value={"Medico Especialista"}>Médico Especialista</MenuItem>
                            <MenuItem value={"Doctor"}>Doctor</MenuItem>
                            <MenuItem value={"Investigador"}>Investigador</MenuItem>
                        
                        </TextField>
                            
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography variant="subtitle2" color="initial">Usuario</Typography>
                        <TextField
                                id="user"
                                value={this.state.username}
                                onChange={this.onChange}
                                type="text"
                                htmlFor="username"
                                name="username"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="true"
                                size="small"
                                placeholder="Usuario"
                                error={Boolean(this.props.errors?.username)}
                                helperText={this.props.errors?.username ? 'Usuario no disponible, intente otro' : null}
                                />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography variant="subtitle2" color="initial">Correo Electronico</Typography>
                              <TextField
                                id="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                type="email"
                                htmlFor="email"
                                name="email"
                                fullWidth
                                variant="outlined"
                                placeholder="Ingrese su correo electronico"
                                required
                                autoComplete="true"
                                size="small"
                                error={Boolean(this.props.errors?.email)}
                                helperText={this.props.errors?.email ? 'Ya existe una cuenta con este correo' : null }
                                />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography variant="subtitle2" color="initial">Ingrese su contraseña</Typography>
                        <TextField
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    type="password"
                                    htmlFor="password"
                                    name="password"
                                    fullWidth
                                    required
                                    placeholder="Ingrese su contraseña"
                                    size="small"
                                    variant="outlined"
                                    error={Boolean(this.props.errors?.password)}
                                    helperText={this.props.errors?.password ? this.props.errors?.password[0] : ""}
                                    />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography variant="subtitle2" color="initial">Confirme su contraseña</Typography>
                        <TextField
                                    id="confirm_password"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    value={this.state.confirm_password}
                                    type="password"
                                    htmlFor="password"
                                    name="confirm_password"
                                    fullWidth
                                    required
                                    placeholder="Confirme su contraseña"
                                    size="small"
                                    error={Boolean(this.props.errors?._schema)}
                                    helperText={this.props.errors?._schema ? this.props.errors?._schema[0] : ""}
                                    />
                        </Grid>                                                               
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                    >
                      Crear cuenta
                    </Button>
                </form>
              {authRedirect}
            </Container>
        )
    }
}

const top100Films = [
  { title: 'Neurología', year: 1994 }
]

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    registrationCompleted: state.user.registrationCompleted,
    loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (user) => dispatch(actions.register(user))
  }
}
export default connect( mapStateToProps, mapDispatchToProps )(withStyles(useStyles)(Register));