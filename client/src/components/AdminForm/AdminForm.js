import React from "react"
class AdminForm extends React.Component {

    constructor(props) {
        super(props);

        let initialStateArray = [];

        this.props.singleBar.deals.map((val, idx)=>{
            let dealObj = {
                weekDays: val.weekDays.toString(),
                startTime: val.startTime,
                endTime: val.endTime,
                deals: "here are the deals"
            }
            initialStateArray.push(dealObj);
        })

        this.state = {
            deals: initialStateArray,
            Name: this.props.singleBar.name,
            Address: this.props.singleBar.address
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
        console.log('print it out') ;
        console.log(this.state.deals);
    }

    render() {
        let {Name, Address, deals} = this.state
        return (
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            <label htmlFor="name">{Name}</label> 
            <br/>
            <label htmlFor="description">{Address}</label> 
            <br/>
            <br/>
            <button onClick={this.addDeal}>Add new Deal</button>
            {
            deals.map((val, idx)=> {
                let wdId = `wd-${idx}`, stId = `st-${idx}`, etId = `et-${idx}`, dId = `d-${idx}`
                return (
                <div key={idx}>
                    <label htmlFor={wdId}>{`Week Days`}</label>
                    <input
                    type="text"
                    name={wdId}
                    data-id={idx}
                    id={wdId}
                    value={deals[idx].weekDays} 
                    className="weekDays"
                    />
                    <br/>
                    <label htmlFor={stId}>Start Time</label>
                    <input
                    type="text"
                    name={stId}
                    data-id={idx}
                    id={stId}
                    value={deals[idx].startTime} 
                    className="startTime"
                    />
                    <br/>
                    <label htmlFor={etId}>End Time</label>
                    <input
                    type="text"
                    name={etId}
                    data-id={idx}
                    id={etId}
                    value={deals[idx].endTime} 
                    className="endTime"
                    />
                    <br/>
                    <label htmlFor={etId}>Deals</label>
                    <input
                    type="text"
                    name={dId}
                    data-id={idx}
                    id={dId}
                    value={deals[idx].deals} 
                    className="deals"
                    />
                    <br/>
                    <br/>
                    <br/>
                </div>
                )
            })
            }
            <input type="submit" value="Submit" /> 
        </form>
        )
    }
}
export default AdminForm