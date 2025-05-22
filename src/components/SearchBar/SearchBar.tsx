import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import s from './SearchBar.module.css'

import { SearchBarProps, FormValues } from './SearchBar.types'

const SearchBar: React.FC<SearchBarProps> = ({handleChangeQuery, toast}) => {
  const handleSubmit = (values: FormValues, action: FormikHelpers<FormValues>) => {
    const {query} = values;
    if(!query.trim()){
      toast.error("Please enter a search query!");
      return;
    }
    if (query.trim().length < 3) {
      toast.error("Search term is too short!");
      return;
    }
  
    if (query.trim().length > 20) {
      toast.error("Search term is too long!");
      return;
    }
    handleChangeQuery(query.trim());
    action.resetForm();
  }
  return (
    <header className={s.headerStyle}>
      <Formik initialValues={{ query: '' }} 
              onSubmit={handleSubmit} 
      >
        <Form className={s.fomikInput}>
          <div className={s.formikInput}>
            <Field
              type="text"
              name = "query"
              placeholder="Search images and photos"
            />
          </div>
          <button type="submit">Search</button>
          
        </Form>
      </Formik>
    </header>

  )
}

export default SearchBar
