/*
 * Filename: PatientRecord.spec.ts
 * Author: Kevin Davis
 * Date: February 17, 2019
 *
 * Description
 * Test file for the PatientRecord object
 */

// ==================================================================

import * as chrome from 'sinon-chrome' 
import * as assert from 'assert'
import PatientRecord from '../src/PatientRecord'
import * as fs from 'fs'

// LOAD THE DOM FOR TESTING
let domFilePath: string = './tests/testIHA.html';
let domHTML: string = fs.readFileSync(domFilePath).toString();
require('jsdom-global')(domHTML);

describe('PatientRecord', () => {

	chrome;

	let pr: PatientRecord = new PatientRecord(true);
	
	describe('convertArmToHealthFairName', () => {
		it('should convert 1 to a healthFair identifier that represents the LHHF', () => {
			let input: number = 1;
			let expectedOutput: PatientRecord.Healthfair = PatientRecord.Healthfair.LHHF;
			let observedOutput: PatientRecord.Healthfair = pr.convertArmToHealthFairName(input);

			assert.equal(observedOutput, expectedOutput);
		});

		it('should convert 10 to LOW', () => {
			let input: number = 10;
			let expectedOutput: PatientRecord.Healthfair = PatientRecord.Healthfair.LOW;
			let observedOutput: PatientRecord.Healthfair = pr.convertArmToHealthFairName(input);

			assert.equal(observedOutput, expectedOutput)
		});
	});

	describe('getArm', () => {
		it('should return the number corresponding to the current arm of the current patient', () => {
			let expectedOutput: number = 11;
			let observedOutput: number = pr.getArm();
			assert.equal(observedOutput, expectedOutput);
		});
	});

	describe('getGenericValue', () => {
		it('should give us back the value of an input identifier of the given named element', () => {
			let input: string = 'first_name';
			let expectedOutput: string = 'Cornelius';
			let observedOutput: string | null = pr.getGenericValue(input);

			assert.equal(expectedOutput, observedOutput);

			input = 'last_name';
			expectedOutput = 'Buffoon';
			observedOutput = pr.getGenericValue(input);
			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('getInstrumentPage', () => {
		it('should return the name of the instrument page', () => {
			let expectedOutput: string = 'Initial Health Assessment';
			let observedOutput: string = pr.getInstrumentPage();
			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('getMRN', () => {
		it('should return the MRN for the current patient being viewed', () => {
			let expectedOutput: number = 23606;
			let observedOutput: number = pr.getMRN();

			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('getState', () => {
		it('should return the appropriate state letters when supplied with the state name', () => {
			let expectedOutput: string = "FL";
			let observedOutput: string | null = pr.getState();
			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('getSex', () => {
		it('should return the letter respresentation for the patient\'s sex', () => {
			let expectedOutput: string = 'F';
			let observedOutput: string = pr.getSex();
			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('constructor', () => {
		it('should return an entire object with the appropriate patient data', () => {
			let expectedOutput: PatientRecord = new PatientRecord(true);
			expectedOutput.healthFair = PatientRecord.Healthfair.WKHF;
			expectedOutput.firstname = "Cornelius";
			expectedOutput.middleinitial = "I";
			expectedOutput.lastname = "Buffoon";
			expectedOutput.DOB = "01-01-1990";
			expectedOutput.MRN = 23606;
			expectedOutput.sex = "F";
			expectedOutput.street = "1234 Big Foot Road";
			expectedOutput.apartment = "";
			expectedOutput.city = "Miami";
			expectedOutput.state = "FL";
			expectedOutput.zip = "33178";
			expectedOutput.phonenumber = "1234567890";
			let observedOutput: PatientRecord = new PatientRecord();

			assert.deepEqual(expectedOutput, observedOutput);
		});
	});
});
