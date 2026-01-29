# Product Catalog Content Quality Report

Generated: 2026-01-29T01:10:09.459Z

Total Products Analyzed: 109

---

## Summary

| Issue Type | Count |
|------------|-------|
| Formatting Issues | 23 |
| Repetitive Content | 0 |
| Generic/Low-Value Content | 0 |
| Missing/Incomplete Data | 4 |

---

## 1. Formatting Issues (23)

These are text fragments with improper formatting, random characters, or capitalization issues.

### HZ-C-WIRWIF01 - automations[2]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected by the camera (human motion detection)....`

### HZ-SC-2PBRE01 - automations[2]
- **Issue**: Malformed list item
- **Text**: `Trigger: Power consumption exceeds a set threshold (e.g., 100W for 5 minutes)....`

### HZ-SC-3PBRE01 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Power consumption exceeds a set threshold (e.g., 3000W for 5 minutes)....`

### HZ-SC-CONACC01 - automations[2]
- **Issue**: Malformed list item
- **Text**: `Action: Lights connected to the gateway turn on at 30% brightness (group dimming)....`

### HZ-SN-CONACC06 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected by a smart sensor (e.g., at night)....`

### HZ-SN-CONACC07 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected by a connected sensor (e.g., at sunset or when it gets dark)....`

### HZ-SM-DOMCAM02 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected by a connected smart motion sensor (e.g., in a hallway or entryway)....`

### HZ-SM-DOMCAM02 - automations[2]
- **Issue**: Malformed list item
- **Text**: `Action: The Bluetooth ceiling speaker (slave) plays a pre-set audio alert (e.g., a chime or voice me...`

### HZ-SN-BATWIF02 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected within 5 meters (detection distance) and 150-degree angle (detection angle)...`

### HZ-SN-DOMCAM01 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected between 10 PM and 6 AM (using the motion detection distance of up to 10 met...`

### HZ-SN-DOMCAM01 - automations[2]
- **Issue**: Malformed list item
- **Text**: `Action: Sends a notification to your phone and turns on a security light (if connected to a smart pl...`

### HZ-SN-CONACC03 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected in the room when light levels are below 50LUX (dark or dimly lit)....`

### HZ-SN-CONACC03 - automations[2]
- **Issue**: Malformed list item
- **Text**: `Action: Turns on connected Zigbee lights (e.g., lamps or ceiling lights)....`

### HZ-SN-CONACC04 - automations[0]
- **Issue**: Malformed list item
- **Text**: `Trigger: Gas concentration reaches 8% LEL methane (dangerous level). Action: Instantly triggers 80dB...`

### HZ-SS-BATSOL01 - automations[0]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected within 8 meters (control distance)....`

### HZ-LT-SPOTLT02 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Action: The 2 Gang Display Light switch turns on the hallway lights via the connected devices (WiFi ...`

### HZ-LT-SPOTLT03 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Time-based (e.g., 7:00 AM daily)....`

### HZ-LT-SPOTLT04 - automations[2]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected in the hallway (using a compatible motion sensor)....`

### HZ-SL-COLNIV01 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Time of day (e.g., 7:00 AM on weekdays)....`

### HZ-LT-SPOTLT08 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected by a smart sensor (e.g., door or hallway)....`

### HZ-LT-CONACC03 - connected_scenes[1]
- **Issue**: Malformed list item
- **Text**: `Changes color based on doorbell notification type (e.g., red for delivery)....`

### HZ-LT-COLNIV01 - automations[1]
- **Issue**: Malformed list item
- **Text**: `Trigger: Motion detected by a compatible motion sensor (e.g., Xiaodu or Amazon Alexa-compatible sens...`

### HZ-LT-SPOTLT09 - automations[0]
- **Issue**: Malformed list item
- **Text**: `Trigger: Time of day (e.g., 6:30 AM on weekdays)....`

---

## 2. Repetitive Content (0)

Content that appears nearly identical across different sections of the same product.

---

## 3. Generic/Low-Value Content (0)

Content using generic phrases that don't provide specific product value.

---

## 4. Missing/Incomplete Data (4)

Products with missing or incomplete automation/integration data.

### automations
Found in 2 products:
- 
- HZ-SM-WIRWIF01

### connected_scenes
Found in 2 products:
- 
- HZ-SM-WIRWIF01

---

## Recommendations

### 1. Fix Formatting Issues
- Remove leading punctuation and orphaned text fragments
- Ensure all sentences start with capital letters
- Remove markdown formatting artifacts
- Clean up whitespace

### 2. Address Repetition
- Make each section distinct:
  - **Automations**: Specific trigger → action workflows
  - **Connected Scenes**: Partner ecosystem integrations
  - **Pillars**: High-level benefits (handled by constants.tsx)
- Avoid copy-pasting similar content

### 3. Replace Generic Content
- Use product-specific capabilities from specs
- Reference actual features (e.g., "2K video", "fingerprint unlock")
- Focus on unique value propositions
- Follow .agent.md guidelines for benefit-focused copy

### 4. Fill Missing Data
- Add automation examples for products missing them
- Define connected scene integrations
- Ensure minimum content quality standards

---

## Next Steps

1. Review this report to prioritize fixes
2. Run `06-fix-content-quality.js` to automatically fix formatting issues
3. Manually review and rewrite generic content
4. Add missing automation/integration data
5. Re-run this analysis to verify improvements

