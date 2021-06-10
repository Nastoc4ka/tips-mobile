import {Button, withStyles} from '@material-ui/core';

const FormButton = withStyles(() => ({
    root: {
      color: '#FFF',
      backgroundColor: '#FFA200',
      marginTop: 10,

      '&:hover': {
        backgroundColor: 'rgba(255, 162, 0, 0.8)',
      },
    },
}))(Button);

export default FormButton;
