# Ello AI Grading System - Testing Guide

## Quick Start Testing

### 1. Test Backend Directly (Node.js)

```javascript
// test-ello.js
const ElloAIGrader = require('./src/elloAIGrader');

const grader = new ElloAIGrader();

// Test 1: Grade a writing submission
const writingResult = grader.gradeSubmission(
    { content: "Once upon a time, there was a princess who loved to read books. She read many books about adventures and magic. One day, she found a special book that told her about a hidden treasure." },
    '3-5',
    'writing'
);

console.log('Writing Grade:', writingResult);

// Test 2: Grade a presentation
const presentationResult = grader.gradeSubmission(
    { content: 'I presented about planets and their moons', hasVisuals: true },
    '5',
    'presentation'
);

console.log('Presentation Grade:', presentationResult);

// Test 3: Grade a picture
const pictureResult = grader.gradeSubmission(
    { fileUrl: 'image.jpg', content: 'A colorful landscape painting' },
    '4',
    'picture'
);

console.log('Picture Grade:', pictureResult);
```

**Run with:**
```bash
node test-ello.js
```

---

### 2. Test API Endpoints (cURL)

#### Test Writing Grading
```bash
curl -X POST http://localhost:3001/api/ello/grade/writing \
  -H "Content-Type: application/json" \
  -d '{
    "content": "I love learning new things every day. Today I learned about the water cycle. The water cycle is when water moves from the sky to the ground and back again. First, water evaporates from oceans and lakes. Then it forms clouds. When it rains, water falls back to Earth.",
    "gradeLevel": "3-5"
  }'
```

#### Test Presentation Grading
```bash
curl -X POST http://localhost:3001/api/ello/grade/presentation \
  -H "Content-Type: application/json" \
  -d '{
    "description": "I created a presentation about renewable energy. I discussed solar power, wind power, and hydro power. I included slides with diagrams and photos. I talked about how these help the environment.",
    "gradeLevel": "6-8",
    "hasVisuals": true
  }'
```

#### Test Picture Grading
```bash
curl -X POST http://localhost:3001/api/ello/grade/picture \
  -H "Content-Type: application/json" \
  -d '{
    "fileUrl": "https://example.com/artwork.jpg",
    "description": "A landscape painting showing mountains, trees, and a sunset.",
    "gradeLevel": "4"
  }'
```

#### Get Ello Info
```bash
curl http://localhost:3001/api/ello/info
```

---

### 3. Test Frontend (Browser)

1. Start the server:
```bash
cd LetsLearn
npm start
```

2. Navigate to:
```
http://localhost:3001/ello-grading.html
```

3. **Test Writing:**
   - Select "📝 Writing (Essay, Story, Poem)"
   - Select "3rd-5th Grade"
   - Enter sample text in textarea
   - Click "Submit to Ello for Grading! 🚀"
   - Verify score displays and feedback appears

4. **Test Presentation:**
   - Select "🎤 Presentation"
   - Select "6th-8th Grade"
   - Enter presentation description
   - Check "I included visual aids"
   - Submit and verify results

5. **Test Picture:**
   - Select "🎨 Picture/Image"
   - Select "1st-2nd Grade"
   - Select an image file
   - Enter artwork description
   - Submit and verify results

---

## Test Cases

### Writing Submission Tests

#### Test Case W1: Kindergarten Short Text
**Input:**
- Grade Level: K
- Content: "I like cats. Cats are nice. I have a cat."

**Expected:**
- Score: 60-80
- Letter Grade: D-B
- Positive feedback about effort
- Suggestions to add more details

#### Test Case W2: 5th Grade Story
**Input:**
- Grade Level: 3-5
- Content: "My adventure began on a sunny morning. I decided to explore the mysterious forest near my house. The trees were tall and green, and sunlight filtered through the leaves. As I walked deeper, I heard strange sounds. Suddenly, I discovered a hidden waterfall cascading down rocky cliffs. The water sparkled like diamonds in the light. I sat and enjoyed this beautiful discovery for hours."

**Expected:**
- Score: 80-95
- Letter Grade: B-A
- Positive feedback on descriptive language
- Suggestions might include varying sentence structures

#### Test Case W3: High School Essay
**Input:**
- Grade Level: 9-12
- Content: "Climate change presents unprecedented challenges to contemporary society. The empirical evidence overwhelmingly demonstrates anthropogenic factors as the primary driver. Rising CO2 levels, coupled with deforestation, have disrupted natural carbon cycles. Consequently, global temperatures have increased by 1.1°C since pre-industrial times. This thesis proposes that immediate governmental intervention, combined with individual accountability, provides the most viable pathway toward mitigation. Furthermore, renewable energy adoption and carbon pricing mechanisms represent evidence-based solutions with proven efficacy in reducing emissions."

**Expected:**
- Score: 85-100
- Letter Grade: B+-A
- Recognition of sophisticated vocabulary and argument structure
- Suggestions for empirical data inclusion

---

### Presentation Tests

#### Test Case P1: Kindergarten Show & Tell
**Input:**
- Grade Level: K
- Description: "I showed everyone my toy dinosaur. It is big and green. I told them dinosaurs lived a long time ago."
- Has Visuals: false

**Expected:**
- Score: 65-80
- Positive feedback on participation
- Suggestion to use pictures or props

#### Test Case P2: Middle School Report
**Input:**
- Grade Level: 6-8
- Description: "My presentation covered the American Revolution, including causes, major battles, and key figures. I discussed how British taxation led to colonial resistance. I covered the Declaration of Independence and George Washington's leadership."
- Has Visuals: true

**Expected:**
- Score: 80-90
- Letter Grade: B-A
- Positive feedback on organization
- Suggestions for depth or additional historical context

---

### Picture Tests

#### Test Case Pi1: Elementary Drawing
**Input:**
- Grade Level: 1-2
- FileUrl: (any image)
- Description: "I drew a rainbow with red, orange, yellow, green, and blue. I drew a sun too."

**Expected:**
- Score: 70-85
- Letter Grade: C-B
- Positive feedback on colors and creativity
- Suggestions for adding more details

#### Test Case Pi2: Middle School Artwork
**Input:**
- Grade Level: 6-8
- FileUrl: (any image)
- Description: "This is a charcoal portrait study exploring light and shadow. I focused on facial proportions and expressive eyes. The background is intentionally minimal to emphasize the subject."

**Expected:**
- Score: 80-95
- Letter Grade: B-A
- Recognition of technical skill
- Discussion of artistic choices

---

## Edge Cases

### EC1: Minimum Content
**Input:** Very short submission (< 10 words)
**Expected:** Lower score, suggestion to expand

### EC2: Very Long Content
**Input:** 50,000 character essay
**Expected:** Score handling, no timeout

### EC3: Invalid Grade Level
**Input:** Grade level "99"
**Expected:** Error response

### EC4: Missing Required Fields
**Input:** Missing content field
**Expected:** 400 Bad Request error

### EC5: Unknown Assignment Type
**Input:** Assignment type "podcast"
**Expected:** Error response

### EC6: Special Characters
**Input:** Content with emojis, symbols, multiple languages
**Expected:** Proper handling and analysis

---

## Performance Tests

### PT1: Response Time
**Test:** Submit writing, measure response time
**Expected:** < 500ms

### PT2: Multiple Submissions
**Test:** Rapid-fire 10 submissions
**Expected:** All complete, no failures

### PT3: Concurrent Requests
**Test:** 5 simultaneous grading requests
**Expected:** All respond correctly, no data corruption

---

## Regression Tests

After any code changes, test:

1. ✅ All 5 grade levels return valid scores
2. ✅ All 3 assignment types work
3. ✅ Letter grades match score ranges correctly
4. ✅ Feedback is always generated
5. ✅ Suggestions are always provided
6. ✅ Ello personality elements display
7. ✅ Frontend form validation works
8. ✅ API error handling works
9. ✅ File upload works (for pictures)
10. ✅ Score calculations are consistent

---

## Browser Compatibility Tests

Test Ello on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Sample Test Results Log

```
ELLO AI GRADING SYSTEM - TEST RESULTS
=====================================

Writing Tests:
✅ W1 (K-Grade): PASS - Score 72/100, Letter D
✅ W2 (3-5 Grade): PASS - Score 88/100, Letter B
✅ W3 (9-12 Grade): PASS - Score 92/100, Letter A

Presentation Tests:
✅ P1 (K-Show): PASS - Score 68/100, Letter D
✅ P2 (6-8 Report): PASS - Score 85/100, Letter B

Picture Tests:
✅ Pi1 (1-2 Drawing): PASS - Score 76/100, Letter C
✅ Pi2 (6-8 Artwork): PASS - Score 87/100, Letter B

API Tests:
✅ POST /api/ello/grade/writing: PASS - 200 OK
✅ POST /api/ello/grade/presentation: PASS - 200 OK
✅ POST /api/ello/grade/picture: PASS - 200 OK
✅ GET /api/ello/info: PASS - 200 OK

Edge Cases:
✅ EC1 (Minimum Content): PASS - Error handling works
✅ EC2 (Very Long Content): PASS - Processes correctly
✅ EC3 (Invalid Grade): PASS - Rejects with error
✅ EC4 (Missing Fields): PASS - 400 Bad Request

Performance:
✅ PT1 (Response Time): PASS - 245ms avg
✅ PT2 (Multiple Submissions): PASS - All complete
✅ PT3 (Concurrent Requests): PASS - No conflicts

TOTAL: 20/20 TESTS PASSED ✅
```

---

## Manual Testing Checklist

- [ ] Can access `/ello-grading.html`
- [ ] Form displays correctly on desktop
- [ ] Form displays correctly on mobile
- [ ] Assignment type dropdown works
- [ ] Grade level dropdown works
- [ ] Writing section shows when writing selected
- [ ] Presentation section shows when presentation selected
- [ ] Picture section shows when picture selected
- [ ] Submit button is disabled until fields filled
- [ ] Loading state shows while grading
- [ ] Results display with all information
- [ ] Score displays correctly
- [ ] Letter grade is correct
- [ ] Feedback text is present
- [ ] Celebration emoji appears
- [ ] Suggestions list shows
- [ ] Ello message is encouraging
- [ ] "Submit Another" button works
- [ ] Form resets after submitting another

---

## Debugging

### Enable Debug Logging

In `elloAIGrader.js`, add:
```javascript
console.log('Analyzing:', analysis);
console.log('Rubric:', rubric);
console.log('Calculated Score:', score);
```

### Check Network Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit a grading
4. Check request payload
5. Check response body
6. Look for errors in Console tab

### Common Issues

**Issue: "Rubric not found"**
- Solution: Verify grade level spelling matches exactly
- Grade levels: 'K', '1-2', '3-5', '6-8', '9-12'

**Issue: Score always the same**
- Solution: Ensure analysis is extracting data
- Check word count, paragraph count, etc.

**Issue: Frontend not submitting**
- Solution: Check browser console for errors
- Verify API endpoint URLs match
- Check CORS if API on different domain

---

## Success Criteria

Ello is working correctly when:

✅ All grade levels produce scores 0-100
✅ Letter grades match score ranges (A:90+, B:80+, C:70+, D:60+, F:<60)
✅ Every submission gets unique feedback
✅ Suggestions are relevant to grade level
✅ Personality is consistent and encouraging
✅ Frontend is responsive and user-friendly
✅ API endpoints are stable and fast
✅ Error handling is graceful
✅ Multiple submissions work without issues
✅ No console errors during operation

---

## Support & Troubleshooting

For help, check:
1. ELLO_DOCUMENTATION.md for API details
2. Console errors for specific issues
3. Network tab for API response codes
4. Test cases above for expected behavior
