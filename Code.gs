/**
 * A Google App Script to manage Animal Crossing New Horizon's Stalk Market predictions
 *
 * @name google-sheets-stalk-market-calculator
 * @version 1.1.0
 *
 * Derived from drfuzzyness's Google Sheets code
 * <https://github.com/drfuzzyness/google-sheets-stalk-market-calculator>
 * <file: google-sheets-stalk-market-calculator/Code.gs>
 *
 * Engine in Engine.gs lifted wholesale from Mike Bryant's excellent webapp translation of Treeki's reverse engineering of the Animal Crossing source code
 * <https://mikebryant/ac-nh-turnip-prices>
 * <file: ac-nh-turnip-prices/js/predictions.js>
 */

/**
 *
 * @param {Array<object>} predictions_array
 * @param {Sheet} sheet The sheet of the spreadsheet we're targeting
 * @param {number} startRow
 */
function writeForecastToSheet(predictions_array, sheet, startRow)
{
  // Create 2D array
  let table_grid = [];

  for(const prediction of predictions_array)
  {
    if(prediction !== undefined)
    {
      let row = [];
      row.push( PATTERN_HUMAN[ prediction.pattern_number ] );
      row.push(prediction.probability);

      for(let i = 2; i < prediction.prices.length; i++)
      {
        const price = prediction.prices[i];
        row.push(price.min);
        row.push(price.max);
      }

      table_grid.push(row);
    }
  }

  // Write 2D array if there are entries to write
  if(table_grid.length > 0 && table_grid[0].length > 0)
  {
    const numRows = table_grid.length;

    sheet.getRange(startRow, 1, numRows, NUM_OF_COLUMNS).setValues(table_grid);
    if(MAX_NUM_OF_ENTRIES - numRows > 0) {
      sheet.hideRows(START_ROW_OF_RESULTS_TABLE + numRows, MAX_NUM_OF_ENTRIES - numRows);
    }
  }
}

function calculateOutput( data, first_buy, last_pattern )
{
  let predictor = new Predictor( data, first_buy, last_pattern );
  let possibilities = predictor.analyze_possibilities();
  return possibilities;
}

function updateSheet(sheet)
{
  try
  {
    clearProbabilities(sheet);

    // Get first buy
    const first_buy = ( sheet.getRange( USER_FIRST_BUY ).getValue() == 'Yes' ) ? true: false;

    // Get the user's last pattern
    const last_pattern = PATTERN[ sheet.getRange( USER_PREVIOUS_PATTERN ).getValue().toString().toUpperCase().split( ' ' ).join( '_' ) ];

    // Get the user's buy price
    const buy_price = sheet.getRange( USER_BUY_PRICE ).getValue();

    // Get the user's sell prices
    const sell_prices = sheet.getRange( USER_SELL_PRICE_RANGE ).getValues();
    const sell_prices_sanitized = sell_prices[0].map( function ( el ) { return ( el != '' ) ? el : NaN } );
    const sell_prices_captured = sell_prices[0].filter( function ( el ) { return el != ''; } );


    // Only continue if there are sell prices
    if( sell_prices_captured.length > 0 )
    {
      const prices = [ buy_price, buy_price, ...sell_prices_sanitized ];
      forecast = calculateOutput( prices, first_buy, last_pattern );

      if( forecast[0].weekMax == '-Infinity' )
      {
        throw new Error("Your prices do not match any known pattern.");
      }
      else
      {
        writeForecastToSheet( forecast, sheet, START_ROW_OF_RESULTS_TABLE );
      }
    }
  }
  catch (error)
  {
    writeError(error, sheet);
    return;
  }
}

function onOpen( open )
{
  const sheet = open.range.getSheet();
  const sheetName = sheet.getName();

  for( let i = 0; i < WHITELISTED_SHEET_PREFIX.length; i++ )
  {
    if( sheetName.startsWith( WHITELISTED_SHEET_PREFIX[i] ) )
    {
      updateSheet( sheet );
    }
  }
}

function onEdit( edit )
{
  const sheet = edit.range.getSheet();
  const sheetName = sheet.getName();

  for( let i = 0; i < WHITELISTED_SHEET_PREFIX.length; i++ )
  {
    if( sheetName.startsWith( WHITELISTED_SHEET_PREFIX[i] ) )
    {
      updateSheet( sheet );
    }
  }
}

function clearProbabilities( sheet )
{
  // Clear previous error
  sheet.getRange( USER_ERROR_RANGE )
    .setBackground( USER_ERROR_DEFAULT_STYLE[ 'bgColor' ] )
    .setFontColor( USER_ERROR_DEFAULT_STYLE[ 'color' ] )
    .setFontWeight( USER_ERROR_DEFAULT_STYLE[ 'fontWeight' ] )
    .setHorizontalAlignment( USER_ERROR_DEFAULT_STYLE[ 'textAlign' ] )
    .setValue( USER_ERROR_DEFAULT_TEXT );

  // Clear previous contents
  sheet.showRows( START_ROW_OF_RESULTS_TABLE, MAX_NUM_OF_ENTRIES );
  sheet.getRange( START_ROW_OF_RESULTS_TABLE, 1, MAX_NUM_OF_ENTRIES, NUM_OF_COLUMNS )
    .clear( {contentsOnly: true} );
}

function writeError( errorDescription, sheet )
{
  clearProbabilities( sheet );

  sheet.getRange( USER_ERROR_RANGE )
    .setBackground( USER_ERROR_ACTIVE_STYLE[ 'bgColor' ] )
    .setFontColor( USER_ERROR_ACTIVE_STYLE[ 'color' ] )
    .setFontWeight( USER_ERROR_ACTIVE_STYLE[ 'fontWeight' ] )
    .setHorizontalAlignment( USER_ERROR_ACTIVE_STYLE[ 'textAlign' ] )
    .setValue( errorDescription );
}