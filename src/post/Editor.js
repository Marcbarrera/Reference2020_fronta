import React, { useState } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor() {
    const [value, setvalue] = useState ("")
    const handleOnChange = (e, editor) => {
        console.log(editor.getData())
    }
    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                onChange={handleOnChange}
            />
            
        </div>
    )
}
export default Editor;