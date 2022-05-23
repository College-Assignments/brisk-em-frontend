import yup from 'yup';

export const formValidationSchema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required('Required!'),
        options: yup.array().of(
          yup.object().shape({
            title: yup.string().required('Required!'),
          })
        ),
      })
    )
    .required('Must add a question'),
});
