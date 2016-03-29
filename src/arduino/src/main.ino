#include <FastLED.h>

#define NUM_LEDS 15
#define DATA_PIN 6

// strip definition
CRGB leds[NUM_LEDS];

// incoming message
String fromApp;

// state
String state = "off";

void setup() {
	Serial.begin(9600);
	FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
	fill_solid(leds, NUM_LEDS, CRGB::Black);
	FastLED.show();
}

void loop() {
	// handle incoming message
	while (Serial.available()) {
		char recieved = Serial.read();
		if (recieved == '#') {
			handleMessage();
			digitalWrite(13, LOW);
			fromApp = "";
		}
		else {
			digitalWrite(13, HIGH);
			fromApp += recieved;
		}
	}
	// switch to given state
	handleState();

	// update leds
	FastLED.show();
	delay(10);
}

void handleMessage() {
	// off
	if (fromApp == "0") {
		state = "off";
	}
	// on
	else if (fromApp == "1") {
		state = "on";
	}
}

void handleState() {
	if (state == "on") {
		fill_solid(leds, NUM_LEDS, CRGB::White);
	}
	else if (state == "off") {
		fill_solid(leds, NUM_LEDS, CRGB::Black);
	}
}
