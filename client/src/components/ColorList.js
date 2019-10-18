import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  console.log(history)
  console.log(colorToEdit)
  

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      console.log(response)
      colors = colors.filter(item => item.id !== response.data.id)
      console.log(colors)
      updateColors([...colors, response.data])
      setEditing(false)
    })
    .catch(error => console.log(error))
  };

  const deleteColor = color => {
    console.log(color.id)
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
    .then(response => {
      console.log(response)
      // response.data = the ID OF ITEM YOU JUST DELETED!!!
      updateColors(colors.filter(item => item.id !== response.data))
    })
    .catch(error => console.log(error))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
