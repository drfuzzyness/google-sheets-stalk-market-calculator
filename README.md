# Stalk Market Calculator for Google Sheets

A Google App Script to manage Animal Crossing New Horizon's Stalk Market predictions.

## Getting Started

1. Open Google Sheets with one of the links below and create a copy.
   - [Full Animal Crossing Google Sheet](https://docs.google.com/spreadsheets/d/1i0W3fhXt8N042dsRucaYv515eJLM65_j2xuRYNTOS-Y/copy) including: Turnip Tracker, Recipe Tracker, Item Registry, Flower Registry, and Island List.
   - [Animal Crossing Google Sheet](https://docs.google.com/spreadsheets/d/1aR7Uk3Q0BaqagDwL40NPc1ygSnoagp_lxFSZ4Xo2uS0/copy) with only the Turnip Tracker.

2. There are two types of sheets:
   - The first **Turnips** can be duplicated as many times as needed to track as many islands as needed; in this fashion you can invite all your friends as editors and have them add in their data on their own sheet.
   - The second **Turnips (from External Sheet)** can also be duplicated; data for this can be auto-filled from external Google Sheets using `importrange`.
   
3. To create a new sheet, you need to duplicate the existing sheet type you want, and rename it `Turnips {your name here}`. All sheets that don't start with the word `Turnips` (case sensitive) are ignored by this script.
   - You can change this behaviour in the [`Constants.gs`](https://github.com/drfuzzyness/google-sheets-stalk-market-calculator/blob/9082a39dd635994b55a73ffad3d23927a142122a/Constants.gs#L12) script file of your spreadsheet copy.
   - See _Editing the Script_ for how to edit that

## Editing the Script

1. Open `Tools` / `Script Editor`
2. Select `Run` / `Run Function` / `priceTest`
3. An in-window popup will ask you for permissions. Select `Review Permissions`
4. Another popup will ask which Google Account you want to link this script to. `Continue`.
5. A very menacing page will explain that this script isn't verified through Google. To continue, click the tiny text `Advanced` near the bottom, then click `Go to Stalks (unsafe)`
6. Finally, select `Allow`
7. If you edit the sheets or want to change the layout, much of the defaults can be found in `Constants.gs`
