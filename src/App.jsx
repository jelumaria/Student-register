import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    email: '',
    gender: { male: false, female: false },
    dob: '',
    course: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "gender") {
      setFormData(prevData => ({
        ...prevData,
        gender: {
          male: value === "male" ? checked : prevData.gender.male,
          female: value === "female" ? checked : prevData.gender.female,
        }
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const isFormValid = () => {
    const { name, address, mobile, email, gender, dob, course } = formData;
    const validationErrors = {};

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) validationErrors.name = "Name should contain only letters and spaces.";
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) validationErrors.mobile = "Mobile should be a 10-digit number.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.email = "Enter a valid email.";
    if (!address) validationErrors.address = "Address is required.";
    if (!(gender.male ^ gender.female)) validationErrors.gender = "Select only one gender.";
    if (!dob) validationErrors.dob = "Date of birth is required.";
    if (!course) validationErrors.course = "Select a course.";

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleRegister = () => {
    if (isFormValid()) {
      alert(`Data stored successfully:\n${JSON.stringify(formData, null, 2)}`);
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      address: '',
      mobile: '',
      email: '',
      gender: { male: false, female: false },
      dob: '',
      course: ''
    });
    setErrors({});
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ width: 600, p: 5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" align="center" color="warning" gutterBottom>
          STUDENT REGISTRATION FORM
        </Typography>

        <form>
          <TextField
            name='name'
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />

          <TextField
            name='address'
            label="Address"
            variant="outlined"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            margin="normal"
          />

          <TextField
            name='mobile'
            label="Mobile"
            variant="outlined"
            fullWidth
            value={formData.mobile}
            onChange={handleChange}
            type="tel"
            error={!!errors.mobile}
            helperText={errors.mobile}
            margin="normal"
          />

          <TextField
            name='email'
            label="Email (abc@gmail.com)"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            type="email"
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />

          <Typography variant="body1" component="label" sx={{ fontWeight: 'bold', display: 'block', mt: 2 }}>
            Gender
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="gender"
                value="male"
                checked={formData.gender.male}
                onChange={handleChange}
              />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="gender"
                value="female"
                checked={formData.gender.female}
                onChange={handleChange}
              />
            }
            label="Female"
          />
          {errors.gender && <Typography color="error" variant="caption">{errors.gender}</Typography>}

          <TextField
            name='dob'
            label="Date of Birth"
            variant="outlined"
            fullWidth
            value={formData.dob}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob}
            margin="normal"
          />

          <FormControl fullWidth variant="outlined" error={!!errors.course} margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              name="course"
              label="Course"
              value={formData.course}
              onChange={handleChange}
            >
              <MenuItem value="biology">Biology</MenuItem>
              <MenuItem value="computer-science">Computer Science</MenuItem>
              <MenuItem value="commerce">Commerce</MenuItem>
              <MenuItem value="humanities">Humanities</MenuItem>
            </Select>
            {errors.course && <Typography color="error" variant="caption">{errors.course}</Typography>}
          </FormControl>

          <Stack direction="row" spacing={2} mt={3}>
            <Button onClick={handleRegister} variant="contained" color="warning" fullWidth sx={{ height: '50px' }}>
              Register
            </Button>
            <Button
  onClick={handleCancel}
  variant="outlined"
  fullWidth
  sx={{
    color: '#ff9800', 
    borderColor: '#ff9800', 
  
    height: '50px',
  }}
>
  Cancel
</Button>

          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default App;
