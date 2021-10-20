import { useState } from "react"
import { BsArrowLeft } from "react-icons/bs";

const SelectColumn = ({ data, setSlide }) => {
    const [isColName, setColName] = useState();
    const [columnName, setColumnName] = useState([])
    const [chooseDate, setChooseDate] = useState(false)

    const isColumnName = (e) => {
        setColName(e.target.id)
        let str = data
        if (e.target.id === 'yes' && str.length > 0) {
            const headers = str.slice(0, str.indexOf('\n') - 1).split(',');
            setColumnName(headers)
        }
    }

    const controlBack = () => {
        if (chooseDate === false) {
            setSlide(1)
        } else {
            setSlide(2)
            setChooseDate(false)
        }
    }

    return (
        <div className="file-upload__header">
            <p className="back" onClick={controlBack}><BsArrowLeft /> Back</p>
            {chooseDate === false && (
                <>
                    <p>Does it contain header?</p>
                    <div className="file-upload__header--checkbox">
                        <div>
                            <input type="radio" id="yes" checked={isColName === 'yes' ? 'checked' : ''} className="radio-input" name="radio-group" onChange={isColumnName} />
                            <label htmlFor="yes" className="radio-label" > <span className="radio-border"></span> Yes </label>
                        </div>

                        <div>
                            <input type="radio" id="no" className="radio-input" name="radio-group" onChange={isColumnName} />
                            <label htmlFor="no" className="radio-label" ><span className="radio-border"></span>No</label>
                        </div>
                    </div>
                </>
            )}

            {isColName === 'yes' && (
                <>
                    <div className="file-upload__select-wrapper">
                        <h2>Choose the Columne name that contain {`${chooseDate ? 'Date' : 'Text'}`}</h2>
                        <div className="file-upload__custom-select">
                            <select>
                                <option disabled defaultValue>Select column</option>
                                {columnName.map((data, idx) =>
                                    <option value={idx} key={idx}>{data}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    {chooseDate === false ? (
                        <div className="file-upload__option">
                            <p onClick={() => setChooseDate(true)}>Choose column with date</p>
                        </div>
                    ) : (
                        <div className="file-upload__submit">
                            <p>All Done!</p>
                            <button type="button">SUBMIT</button>
                        </div>
                    )
                    }
                </>
            )}
        </div>
    )
}

export default SelectColumn;