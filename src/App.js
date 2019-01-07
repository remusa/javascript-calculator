import React, { Component } from 'react'
import './App.scss'

import Buttons from './components/Buttons'
import Display from './components/Display'
import Formula from './components/Formula'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = this.initialState

        this.isEmpty = this.isEmpty.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleNumbers = this.handleNumbers.bind(this)
        this.handleOperators = this.handleOperators.bind(this)
        this.handleDecimal = this.handleDecimal.bind(this)
        this.handleEvaluate = this.handleEvaluate.bind(this)
    }

    initialState = {
        displayValue: '0',
        expressions: [],
    }

    isEmpty() {
        return this.state.displayValue === '0' ? true : false
    }

    isMaxLength() {
        return this.state.displayValue.length >= 10 ? true : false
    }

    handleClear(e) {
        this.setState(this.initialState)
    }

    handleNumbers(e) {
        if (this.isMaxLength()) {
            console.log('Max length reached')
            return
        }

        const displayValue = this.isEmpty()
            ? e.target.value
            : this.state.displayValue.concat(e.target.value)

        this.setState({
            displayValue: displayValue,
        })
    }

    handleDecimal(e) {
        if (this.isMaxLength()) {
            console.log('Max length reached')
            return
        }

        const displayValue = !this.isEmpty()
            ? this.state.displayValue.split('').includes('.')
                ? this.state.displayValue
                : this.state.displayValue.concat(e.target.value)
            : '0'

        this.setState({
            displayValue: displayValue,
        })
    }

    handleOperators(e) {
        if (this.isMaxLength()) {
            console.log('Max length reached')
            return
        }

        const displayValue = this.isEmpty()
            ? e.target.value
            : this.state.displayValue.concat(e.target.value)

        this.setState({
            expressions: this.state.expressions.concat(displayValue),
            displayValue: this.initialState.displayValue,
        })
    }

    handleEvaluate(e) {
        if (this.isEmpty()) {
            console.log('Empty')
            return
        }

        const displayValue = this.state.displayValue
        const expressions = this.state.expressions.concat(displayValue)

        // console.log('number: ', Number.parseFloat(displayValue))

        this.setState({
            expressions: expressions,
            displayValue: this.initialState.displayValue,
        })
    }

    render() {
        return (
            <div className="calculator-container">
                <div className="calculator">
                    <Formula formula={this.state.expressions} />

                    <Display displayValue={this.state.displayValue} />

                    <div className="calculator__row calculator__row1">
                        <Buttons
                            name="clear"
                            sign="AC"
                            onClick={this.handleClear}
                        />
                        <Buttons
                            name="multiply"
                            sign="*"
                            onClick={this.handleOperators}
                        />
                        <Buttons
                            name="divide"
                            sign="/"
                            onClick={this.handleOperators}
                        />
                    </div>

                    <div className="calculator__row calculator__row2">
                        <Buttons
                            name="seven"
                            sign="7"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="eight"
                            sign="8"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="nine"
                            sign="9"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="subtract"
                            sign="-"
                            onClick={this.handleOperators}
                        />
                    </div>

                    <div className="calculator__row calculator__row3">
                        <Buttons
                            name="four"
                            sign="4"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="five"
                            sign="5"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="six"
                            sign="6"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="add"
                            sign="+"
                            onClick={this.handleOperators}
                        />
                    </div>

                    <div className="calculator__row calculator__row4">
                        <Buttons
                            name="one"
                            sign="1"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="two"
                            sign="2"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="three"
                            sign="3"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="equals"
                            sign="="
                            onClick={this.handleEvaluate}
                        />
                    </div>

                    <div className="calculator__row calculator__row5">
                        <Buttons
                            name="zero"
                            sign="0"
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name="decimal"
                            sign="."
                            onClick={this.handleDecimal}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
