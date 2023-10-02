import CandleColor from '../enum/candle-color'

export default class Candel {
  low: number
  high: number
  open: number
  close: number
  color: CandleColor
  initialDateTime: Date
  finalDateTime: Date
  currency: string
  values: number[]

  constructor (currency: string, initialDateTime: Date) {
    this.currency = currency
    this.initialDateTime = initialDateTime
    this.low = Infinity
    this.high = 0
    this.open = 0
    this.close = 0
    this.values = []
    this.color = CandleColor.UNDETERMINED
  }

  addValue (value: number): void {
    this.values.push(value)
    if (this.values.length === 1) {
      this.open = value
    }
    if (this.low > value) {
      this.low = value
    }

    if (this.high < value) {
      this.high = value
    }
  }

  closeCandle (): void {
    if (this.values.length > 0) {
      this.close = this.values[this.values.length - 1]
      this.finalDateTime = new Date()

      if (this.open > this.close) {
        this.color = CandleColor.RED
      } else if (this.close > this.open) {
        this.color = CandleColor.GREEN
      }
    }
  }

  toSimpleObject (): Omit<this, 'values' | 'addValue' | 'closeCandle' | 'toSimpleObject'> {
    const { values, ...obj } = this
    return obj
  }
}
