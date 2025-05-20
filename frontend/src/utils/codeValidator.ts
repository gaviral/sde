export interface ValidationResult {
    isValid: boolean;
    issues: string[];
}

export const validateCode = (userCode: string, solution: string): ValidationResult => {
    // For version 1, we're doing an exact match to keep it simple
    if (userCode.trim() === solution.trim()) {
        return { isValid: true, issues: [] };
    }

    // Simple diff to identify issues - could be enhanced later
    const userLines = userCode.trim().split('\n');
    const solutionLines = solution.trim().split('\n');

    const issues: string[] = [];

    // Check if function signature is correct
    if (userLines[0] !== solutionLines[0]) {
        issues.push('Function signature is incorrect');
    }

    // Check if the solution has the same number of lines
    if (userLines.length !== solutionLines.length) {
        issues.push(`Expected ${solutionLines.length} lines but found ${userLines.length}`);
    }

    // Look for other specific issues
    // This is very simplistic for version 1
    if (!issues.length) {
        issues.push('Your solution does not match the expected output');
    }

    return { isValid: false, issues };
}; 