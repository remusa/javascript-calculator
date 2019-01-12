import React, { Component } from 'react'
import './App.scss'

import Buttons from './components/Buttons'
import Display from './components/Display'
import Status from './components/Status'
import Formula from './components/Formula'

const endsWithOperator = /[*/+-]$/

class App extends Component {
    constructor(props) {
        super(props)

        this.state = this.initialState

        this.isEmpty = this.isEmpty.bind(this)
        this.isOperator = this.isOperator.bind(this)
        this.removeOperators = this.removeOperators.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleNumbers = this.handleNumbers.bind(this)
        this.handleOperators = this.handleOperators.bind(this)
        this.handleDecimal = this.handleDecimal.bind(this)
        this.handleEvaluate = this.handleEvaluate.bind(this)
    }

    initialState = {
        displayValue: '0',
        expressions: '',
        status: '',
    }

    isEmpty() {
        return this.state.displayValue === '0' ? true : false
    }

    hasOnlyOperator() {
        return (
            this.isOperator(this.state.displayValue) &&
            this.state.displayValue.length === 1
        )
    }

    isOperator(char) {
        const ops = ['*', '/', '+', '-']
        return ops.includes(char)
    }

    isMaxLength() {
        return this.state.displayValue.length >= 20 ? true : false
    }

    handleClear() {
        this.setState(this.initialState)
    }

    handleNumbers(e) {
        if (this.isMaxLength()) {
            this.setState({
                status: 'Max length reached',
            })
            return
        }

        const displayValue =
            this.isEmpty() || this.hasOnlyOperator()
                ? e.target.value
                : this.state.displayValue.concat(e.target.value)

        this.setState({
            displayValue: displayValue,
        })
    }

    handleDecimal(e) {
        if (this.isMaxLength()) {
            this.setState({
                status: 'Max length reached',
            })
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
            this.setState({
                status: 'Max length reached',
            })
            return
        }

        const displayValue = this.isEmpty()
            ? e.target.value
            : this.state.displayValue.concat(e.target.value)

        const expressions = this.state.expressions.concat(displayValue)

        this.setState({
            expressions: expressions,
            displayValue: this.initialState.displayValue,
        })
        // }
    }

    removeOperators(expression) {
        const exp = expression
            .replace(/[*]/g, ',*')
            .replace(/[/]/g, ',/')
            .replace(/[+]/g, ',+')
            .replace(/[-]/g, ',-')
            .split(',')

        for (let i = 0; i < exp.length; i++) {
            if (exp[i].length === 1) {
                while (this.isOperator(exp[i])) {
                    exp.splice(i, 1)
                }
            }
        }

        return exp.join('')
    }

    handleEvaluate() {
        if (this.isEmpty()) {
            this.setState({
                status: 'Empty',
            })
            return
        }

        let expression = this.state.expressions.concat(this.state.displayValue)

        if (endsWithOperator.test(expression)) {
            expression = expression.slice(0, -1)
        }

        expression = this.removeOperators(expression)

        const result =
            Math.round(1000000000000 * eval(expression)) / 1000000000000

        this.setState({
            displayValue: result.toString(),
            expressions: this.initialState.expressions,
        })
    }

    render() {
        return (
            <div className='calculator-container'>
                <div className='calculator'>
                    <div className='calculator__info'>
                        <Status status={this.state.status} />
                        <Formula formula={this.state.expressions} />
                    </div>

                    <Display displayValue={this.state.displayValue} />

                    <div className='calculator__row calculator__row1'>
                        <Buttons
                            name='clear'
                            sign='AC'
                            onClick={this.handleClear}
                        />
                        <Buttons
                            name='multiply'
                            sign='*'
                            onClick={this.handleOperators}
                        />
                        <Buttons
                            name='divide'
                            sign='/'
                            onClick={this.handleOperators}
                        />
                    </div>

                    <div className='calculator__row calculator__row2'>
                        <Buttons
                            name='seven'
                            sign='7'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='eight'
                            sign='8'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='nine'
                            sign='9'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='subtract'
                            sign='-'
                            onClick={this.handleOperators}
                        />
                    </div>

                    <div className='calculator__row calculator__row3'>
                        <Buttons
                            name='four'
                            sign='4'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='five'
                            sign='5'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='six'
                            sign='6'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='add'
                            sign='+'
                            onClick={this.handleOperators}
                        />
                    </div>

                    <div className='calculator__row calculator__row4'>
                        <Buttons
                            name='one'
                            sign='1'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='two'
                            sign='2'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='three'
                            sign='3'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='equals'
                            sign='='
                            onClick={this.handleEvaluate}
                        />
                    </div>

                    <div className='calculator__row calculator__row5'>
                        <Buttons
                            name='zero'
                            sign='0'
                            onClick={this.handleNumbers}
                        />
                        <Buttons
                            name='decimal'
                            sign='.'
                            onClick={this.handleDecimal}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
