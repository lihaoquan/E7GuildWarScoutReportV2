import React, { useState } from 'react'
import axios from 'axios'
import ImageUploading from 'react-images-uploading';

import closeIcon from '../Images/close-01.svg'

const CommentForm = (props) => {

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post('http://localhost:3001/api/add-comment', { data: formData, images: images },
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${props.bearer}` }
            })
            .then(function (response) {
                props.createPopup('Successfully posted comment.', true)
                props.onClose(false)
            }).catch(function (error) {
                props.createPopup('Failed to post comment', false)
                props.onClose(false)
            })
    }

    const [images, setImages] = React.useState([])
    const maxNumber = 2

    const onChange = (imageList) => {
        setImages(imageList)
    }

    const [formData, setFormData] = useState({
        fort_id: props.currentFort,
        comment: '',
        author: props.author
    })

    return (
        <>
            <form className='full-page-small dialog'>
                <div className='form-title'>
                    <h3>New Comment</h3>
                    <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
                </div>
                <div className='form-group image-uploading'>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        acceptType={['png']}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                    style={isDragging ? { color: '#e03627' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Drag &amp; Drop Images (Max. 2)
                                </button>
                                &nbsp;
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(index)}>Update</button>
                                            <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <div className='form-group'>
                    <label>Comment</label>
                    <textarea onChange={(e) => { setFormData({ ...formData, comment: e.target.value }) }} value={formData.comment} placeholder='Add a comment...'></textarea>
                </div>
                <input type='submit' onClick={(e) => { handleSubmit(e) }} name='new_record' value='Add Comment' />
            </form>
        </>
    )
}

export default CommentForm