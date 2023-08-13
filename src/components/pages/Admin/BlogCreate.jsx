import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { Container, Form, Input, Label, Row } from 'reactstrap'
import { apiUrl, toast_config } from '../../../Config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorMessages } from '../../../utils/renderErrorMessages'
import { ThemeContext } from '../../../context/ThemeContext'

function BlogCreate() {
  const [userList, setUserList] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [author, setAuthor] = useState('')
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${apiUrl}/users`).then(res => setUserList(res.data))
  }, [])

  const validate = (data) => {
    const errors = {
      user_id: "",
      title: "",
      img_url: "",
      description: ""
    }

    if (!data.user_id) {
      errors.user_id = errorMessages.required("Author")
    }
    if (!data.title) {
      errors.title = errorMessages.required("Title")
    }
    if (!data.img_url) {
      errors.img_url = errorMessages.required("Image URL")
    }
    if (!data.description) {
      errors.description = errorMessages.required("Description")
    }

    return errors
  }

  function handleCreate(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {}

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const errors = validate(data)
    setValidationErrors(errors)

    // Check if image url is a valid url
    if (data.img_url) {
      try {
        new URL(data.img_url);
      } catch (error) {
        setValidationErrors(prevErrors => ({
          ...prevErrors,
          img_url: errorMessages.invalid("Image URL")
        }));
        return;
      }
    }

    // console.log(Object.values(errors).filter(string => string));

    if (Object.values(errors).filter(string => string).length) {
      toast.error("Fill all input fields!", toast_config)
      return
    }

    axios.post(`${apiUrl}/blogs`, {
      title: data.title,
      description: data.description,
      img_url: data.img_url,
      user_id: Number(data.user_id)
    }).then(res => {
      console.log(res.data);
      e.target.reset()
      setAuthor(null);
      toast.success("Successfully added", toast_config)
      navigate('/')
    })

  }

  return (
    <div>
      <Container>
        <Row>
          <div className='col-md-6'>
            <div>
              <Form onSubmit={(e) => handleCreate(e)}>
                <div className='form-group mb-4'>
                  <Label htmlFor='author'>Author</Label>
                  <Select
                    isClearable
                    name='user_id'
                    options={userList}
                    getOptionValue={option => option.id}
                    getOptionLabel={option => option.fullname}
                    value={author}
                    onChange={selectedOption => setAuthor(selectedOption)}
                    className={
                      `${validationErrors.user_id ? "border border-danger" : ""}
                       ${theme === "dark" ? "text-dark" : ""} `
                    }
                  />

                  {
                    validationErrors.user_id &&
                    <p className='mt-2 text-danger fw-bold'>{validationErrors.user_id}</p>
                  }

                </div>

                <div className='form-group mb-4'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Enter title'
                    className={`${validationErrors.title ? "border border-danger" : ""}`}
                  />

                  {
                    validationErrors.title &&
                    <p className='mt-2 text-danger fw-bold'>{validationErrors.title}</p>
                  }

                </div>

                <div className='form-group mb-4'>
                  <Label htmlFor='img_url'>Image url</Label>
                  <Input
                    type='text'
                    name='img_url'
                    id='img_url'
                    placeholder='Enter image url'
                    className={`${validationErrors.img_url ? "border border-danger" : ""}`}
                  />

                  {
                    validationErrors.img_url &&
                    <p className='mt-2 text-danger fw-bold'>{validationErrors.img_url}</p>
                  }

                </div>

                <div className='form-group mb-4'>
                  <Label htmlFor='decription'>Description</Label>
                  <Input
                    type='textarea'
                    id='description'
                    name='description'
                    placeholder='Enter blog description'
                    rows={7}
                    className={`${validationErrors.description ? "border border-danger" : ""}`}
                  />

                  {
                    validationErrors.description &&
                    <p className="mt-2 text-danger fw-bold">{validationErrors.description}</p>
                  }

                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
              </Form>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default BlogCreate