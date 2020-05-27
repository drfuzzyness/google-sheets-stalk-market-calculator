/**
 * User-Editable Constants for ACNH Stalk Market Predictions
 *
 * @name google-sheets-stalk-market-calculator
 * @version 1.1.0
 *
 * Expanded from drfuzzyness's Google Sheets code
 * <https://github.com/drfuzzyness/google-sheets-stalk-market-calculator>
 * <file: google-sheets-stalk-market-calculator/Code.gs>
 */

const WHITELISTED_SHEET_PREFIX = [
  'Turnips'
]

// What range are the user's inputs located on each page?
const USER_BUY_PRICE = 'B4';
const USER_SELL_PRICE_RANGE = 'C4:N4';
const USER_PREVIOUS_PATTERN = 'S3';

const USER_PRICE_ENTRY_RANGE = 'Z1:AA7';
//const USER_PREVIOUS_PATTERN_RANGE = 'AB6';

// How far down on each sheet should the results start appearing?
const START_ROW_OF_RESULTS_TABLE = 27;

// Where should errors appear?
const USER_ERROR_RANGE = 'B23';
const USER_ERROR_DEFAULT_TEXT = 'Price Forecast'
const USER_ERROR_DEFAULT_STYLE = {
  'bgColor': '#fff2cc',
  'color': '#000000',
  'fontWeight': 'bold',
  'textAlign': 'center'
}
const USER_ERROR_ACTIVE_STYLE = {
  'bgColor': '#ff0000',
  'color': '#ffffff',
  'fontWeight': 'bold',
  'textAlign': 'center'
}

// Algorithmic display constants
const MAX_NUM_OF_ENTRIES = 73;
const NUM_OF_COLUMNS = 26;

// Human-Readable Patterns
const PATTERN_HUMAN = {
  0: 'Fluctuating',
  1: 'Large Spike',
  2: 'Decreasing',
  3: 'Small Spike',
  4: 'All Patterns'
}