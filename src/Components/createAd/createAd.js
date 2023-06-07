import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import './createAd.css';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateAds = () => {

    let { register, handleSubmit, formState: { errors } } = useForm();


    const createAd = (newAd) => {
        console.log(newAd);
        const data = new FormData();
        data.append('title', newAd.title);
        data.append('price', newAd.price);
        data.append('brand', newAd.brand.toUpperCase());
        data.append('description', newAd.description);
        data.append('pic', newAd.pic[0]);
        // console.log(data);
        // for (var key of data.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        // }

        axios.post('/createAd', data);

        toast.success("New Ad Created");


    }
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            style={{
                display: 'flex',
                rowGap: '20px',
                flexDirection: 'column',
                width: 'max-content',
                margin: 'auto',
            }}
            onSubmit={handleSubmit(createAd)}

        >

            <h3>Post a Product</h3>
            <TextField id="standard-basic" label="Title" variant="standard"  {...register('title', { required: true, })} />
            {errors.title && errors.title.type == 'required' && <FormHelperText style={{ color: 'red' }}>Required</FormHelperText>}
            <TextField id="standard-basic" label="Price" variant="standard"  {...register('price', { required: true, })} />
            {errors.price && errors.price.type == 'required' && <FormHelperText style={{ color: 'red' }}>Required</FormHelperText>}
            <TextField id="standard-basic" label="Brand" variant="standard" {...register('brand', { required: true, })} />
            {errors.brand && errors.brand.type == 'required' && <FormHelperText style={{ color: 'red' }}>Required</FormHelperText>}
            <TextField id="standard-basic" label="Description" variant="standard" {...register('description', { required: true, })} />
            {errors.description && errors.description.type == 'required' && <FormHelperText style={{ color: 'red' }}>Required</FormHelperText>}
            <Button
                variant="contained"
                component="label"
                className='createPrdctBtn'
            >
                Add Picture
                <input
                    type="file"
                    hidden
                    {...register('pic', { required: true, })}
                />
            </Button>
            {errors.pic && errors.pic.type == 'required' && <FormHelperText style={{ color: 'red' }}>Required</FormHelperText>}
            <Button variant="contained" type='submit' className='postPrdctBtn'>Post</Button>

        </Box >
    );
}



export default CreateAds;