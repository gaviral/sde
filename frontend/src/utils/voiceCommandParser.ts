export interface CommandResult {
    command: string;
    params: Record<string, any>;
    original: string;
}

// Simple command patterns for voice control
const PATTERNS = [
    { regex: /go to question (\d+)/i, command: 'navigate', paramName: 'questionId' },
    { regex: /check( code)?/i, command: 'check' },
    { regex: /(show|open|display) settings/i, command: 'showSettings' },
    { regex: /(show|open|display) questions/i, command: 'showQuestions' },
    { regex: /(show|open|display) issues/i, command: 'showIssues' },
];

export const parseVoiceCommand = (transcript: string): CommandResult | null => {
    for (const pattern of PATTERNS) {
        const match = transcript.match(pattern.regex);
        if (match) {
            const result: CommandResult = {
                command: pattern.command,
                params: {},
                original: transcript
            };

            // Extract parameter if present
            if (match[1] && pattern.paramName) {
                // Convert to appropriate type (number for questionId)
                if (pattern.paramName === 'questionId') {
                    result.params[pattern.paramName] = parseInt(match[1], 10);
                } else {
                    result.params[pattern.paramName] = match[1];
                }
            }

            return result;
        }
    }

    return null;
}; 