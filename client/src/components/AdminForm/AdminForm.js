import React from "react"
import "./AdminForm.css";

class AdminForm extends React.Component {

    constructor(props) {
        super(props);

        let initialStateArray = [];

        this.props.singleBar.deals.map((val, idx)=>{
            let dealObj = {
                weekDays: val.weekDays.toString(),
                startTime: val.startTime,
                endTime: val.endTime,
                deals: val.description.toString()
            }
            initialStateArray.push(dealObj);
        })

        this.state = {
            deals: initialStateArray,
            Name: this.props.singleBar.name,
            Address: this.props.singleBar.address,
            Validated: this.props.singleBar.validated
        }
    }


    handleChange = (e) => {
        if (["weekDays", "startTime", "endTime", "deals"].includes(e.target.className) ) {
            let deals = [...this.state.deals]
            deals[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            this.setState({ deals }, () => console.log(this.state.deals))
        } else {
            this.setState({ [e.target.weekDays]: e.target.value.toUpperCase() })
        }
    }

    addDeal = (e) => {
        this.setState((prevState) => ({
            deals: [...prevState.deals, {weekDays:"", startTime:"", endTime:"", deals:""}],
        }));
    }

    handleSubmit = (e) => { 
        e.preventDefault();
        console.log(this.state);
    }

    handleDelete = (e) => {
        console.log(`delete: ${e.target.id}`);
        let tmpArray = this.state.deals.splice(e.target.id, 1);
        this.forceUpdate();
    }

    handleValidatedChange = (e) => {
        console.log('validation change');
        this.setState({ Validated: !this.state.Validated});
    }

    render() {
        let {Name, Address, deals, Validated} = this.state
        return (
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            <div className="adminTitle"><label htmlFor="name">{Name}</label></div>
            <div className="adminAddress"><label htmlFor="address">{Address}</label></div>
            <div className="adminValidated">
                <label htmlFor="validated">Validated</label>
                <input className="adminCheckbox" name="isValidated" type="checkbox" checked={this.state.Validated} onChange={this.handleValidatedChange} />
            </div>
            {
            deals.map((val, idx)=> {
                let wdId = `wd-${idx}`, stId = `st-${idx}`, etId = `et-${idx}`, dId = `d-${idx}`
                return (
                <div className="dealItem" key={idx}>
                    <button className="deleteButton" onClick={this.handleDelete} id={idx}>x</button>
                    <br/>
                    <label className="itemLabel" htmlFor={wdId}>Week Days:</label>
                    <input
                    type="text"
                    name={wdId}
                    data-id={idx}
                    id={wdId}
                    value={deals[idx].weekDays} 
                    className="weekDays inputItem"
                    />
                    <br/>
                    <label className="itemLabel" htmlFor={stId}>Start Time:</label>
                    <input
                    type="text"
                    name={stId}
                    data-id={idx}
                    id={stId}
                    value={deals[idx].startTime} 
                    className="startTime inputItem"
                    />
                    <br/>
                    <label className="itemLabel" htmlFor={etId}>End Time:</label>
                    <input
                    type="text"
                    name={etId}
                    data-id={idx}
                    id={etId}
                    value={deals[idx].endTime} 
                    className="endTime inputItem"
                    />
                    <br/>
                    <label className="itemLabel" htmlFor={etId}>Deals:</label>
                    <input
                    type="text"
                    name={dId}
                    data-id={idx}
                    id={dId}
                    value={deals[idx].deals} 
                    className="deals inputItem"
                    />
                </div>
                )
            })
            }
            <br/>
            <button onClick={this.addDeal}>Add new Deal</button>
            <br/>
            <input type="submit" value="Submit" /> 
        </form>
        )
    }
}
export default AdminForm