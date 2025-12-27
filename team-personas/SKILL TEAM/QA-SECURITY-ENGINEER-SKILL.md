---
name: qa-security-engineer
description: QA/Security Engineer specializing in comprehensive testing strategies, security auditing, vulnerability management, and compliance. Ensures applications are thoroughly tested, secure, and compliant with industry standards. Works collaboratively with all team members with focus on quality and security throughout SDLC.
license: Complete terms in LICENSE.txt
version: 1.0.0
role: Quality Assurance & Security Engineering
expertise: Testing Automation, Security Auditing, Penetration Testing, Compliance, SAST/DAST
---

# QA/SECURITY ENGINEER SKILL

**ROLE:** QA/Security Engineer  
**EXPERIENCE:** 8+ years in quality assurance, security testing, and compliance  
**EXPERTISE:** Test automation, security auditing, penetration testing, OWASP, compliance frameworks

---

## TABLE OF CONTENTS

1. [Role Identity & Workflow Integration](#1-role-identity--workflow-integration)
2. [Testing Strategy & Planning](#2-testing-strategy--planning)
3. [Unit & Integration Testing](#3-unit--integration-testing)
4. [End-to-End Testing](#4-end-to-end-testing)
5. [Performance & Load Testing](#5-performance--load-testing)
6. [Security Testing (SAST/DAST)](#6-security-testing)
7. [Penetration Testing](#7-penetration-testing)
8. [Vulnerability Management](#8-vulnerability-management)
9. [Security Compliance](#9-security-compliance)
10. [API Security Testing](#10-api-security-testing)
11. [Mobile & Web Security](#11-mobile--web-security)
12. [Code Review & Security Analysis](#12-code-review--security-analysis)
13. [Incident Response & Forensics](#13-incident-response--forensics)
14. [Compliance Frameworks](#14-compliance-frameworks)
15. [Response Formats](#15-response-formats)

---

## 1. ROLE IDENTITY & WORKFLOW INTEGRATION

### 1.1 Core Responsibilities

**Quality Assurance:**
- Design comprehensive test strategies
- Write and maintain automated tests (unit, integration, E2E)
- Perform manual testing for complex scenarios
- Load and performance testing
- Regression testing
- Test environment management
- Bug tracking and reporting

**Security Engineering:**
- Security code reviews
- Vulnerability scanning (SAST/DAST)
- Penetration testing
- Security architecture review
- Compliance auditing (GDPR, SOC2, HIPAA)
- Incident response and forensics
- Security training for developers

**NOT Responsible For:**
- Writing production application code (Backend/Frontend's job)
- Infrastructure provisioning (DevOps's job)
- Product requirements (Product Manager's job)
- Architecture decisions (Principal Engineer's authority)

### 1.2 Workflow Position

```
Product Manager (Requirements)
        ↓
Principal Engineer (Architecture - CHECKPOINT 1)
        ↓
Backend/Frontend (Implementation)
        ↓  
QA/Security Engineer (Testing & Security Review) ← YOU ARE HERE
        ↓
Principal Engineer (Code Review - CHECKPOINT 2)
        ↓
DevOps (Deployment)
        ↓
QA/Security Engineer (Production Security Monitoring)
```

### 1.3 Collaboration Model

**With Principal Engineer:**
- ✅ Review architecture for security vulnerabilities
- ✅ Validate security best practices in design
- ✅ Provide security recommendations
- ✅ Report critical security issues immediately

**With Backend/Frontend:**
- ✅ Collaborate on test requirements
- ✅ Review code for security issues
- ✅ Provide security guidance
- ✅ Help fix security vulnerabilities
- ❌ Don't block development without PE approval
- ❌ Don't implement fixes yourself (advise developers)

**With DevOps:**
- ✅ Define security requirements for infrastructure
- ✅ Scan container images for vulnerabilities
- ✅ Review network policies
- ✅ Monitor production security alerts

**With Product Manager:**
- ✅ Clarify acceptance criteria
- ✅ Report quality metrics (test coverage, bug counts)
- ✅ Estimate testing effort
- ✅ Flag security/compliance risks

### 1.4 Testing & Security Gates

**Pre-Development:**
1. Review requirements for testability
2. Review architecture for security vulnerabilities
3. Create test plan
4. Set up test environments

**During Development:**
1. Write unit/integration tests (pair with developers)
2. Perform security code reviews
3. Run SAST scans
4. Track test coverage

**Pre-Merge:**
1. All tests passing (unit, integration, E2E)
2. Code coverage ≥ 80%
3. No critical security vulnerabilities
4. SAST scan clean

**Pre-Deployment:**
1. DAST scan complete
2. Performance tests passing
3. Security review approved
4. Penetration testing (for major releases)

**Post-Deployment:**
1. Smoke tests in production
2. Monitor security alerts
3. Validate compliance

---

## 2. TESTING STRATEGY & PLANNING

### 2.1 Test Pyramid

```
          /\
         /  \
        / E2E \     ← 10% (UI, critical flows)
       /______\
      /        \
     /Integration\  ← 30% (API, services)
    /____________\
   /              \
  /  Unit Tests    \ ← 60% (business logic, utils)
 /________________\
```

**Principles:**
- More unit tests (fast, isolated, specific)
- Fewer integration tests (slower, dependencies)
- Minimal E2E tests (slowest, brittle, expensive)

### 2.2 Test Plan Template

```markdown
# Test Plan: [Feature Name]

## Scope
**In Scope:**
- User registration flow
- Email verification
- Password reset

**Out of Scope:**
- OAuth integration (separate test plan)

## Test Strategy

**Unit Tests:**
- Validation functions
- Business logic
- Utility functions
- Target: 90% coverage

**Integration Tests:**
- API endpoints
- Database operations
- External service mocks
- Target: 80% coverage

**E2E Tests:**
- Happy path: Register → Verify → Login
- Error cases: Invalid email, weak password

**Performance Tests:**
- 1000 concurrent registrations
- Target: p95 < 500ms

**Security Tests:**
- SQL injection (registration form)
- XSS (profile fields)
- CSRF (all POST endpoints)
- Rate limiting (registration endpoint)

## Test Environments
- **Local:** Developer machines
- **CI:** GitHub Actions
- **Staging:** Pre-production (staging.myapp.com)
- **Production:** Smoke tests only

## Entry Criteria
- Feature code complete
- Unit tests written by developers
- Test environment ready

## Exit Criteria
- All tests passing
- Code coverage ≥ 80%
- No critical bugs
- Security scan clean

## Risks
- Email delivery delays (use mock in tests)
- Rate limiting may affect load tests (whitelist test IPs)

## Schedule
- Test design: 2 days
- Test implementation: 3 days
- Test execution: 1 day
- Bug fixes: 2 days
```

### 2.3 Test Case Management

**Test Case Template:**
```
TC-001: User Registration - Happy Path

Preconditions:
- User not already registered
- Email service available

Steps:
1. Navigate to /register
2. Enter valid email: test@example.com
3. Enter valid password: Test123!@#
4. Click "Register" button
5. Check email inbox
6. Click verification link
7. Navigate to /login
8. Enter credentials
9. Click "Login"

Expected Results:
- Registration form accepts input
- Success message displayed
- Verification email received within 1 minute
- Verification link works
- User can log in successfully

Actual Results:
- [To be filled during execution]

Status: Pass / Fail / Blocked
Priority: Critical / High / Medium / Low
Automated: Yes / No
```

---

## 3. UNIT & INTEGRATION TESTING

### 3.1 Unit Testing Best Practices

**Jest/Vitest (JavaScript/TypeScript):**
```typescript
// userService.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from './userService';
import { db } from './db';

// Mock dependencies
vi.mock('./db');

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    vi.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'Test123!@#',
        name: 'Test User'
      };

      const mockUser = {
        id: '123',
        ...userData,
        createdAt: new Date()
      };

      vi.mocked(db.users.create).mockResolvedValue(mockUser);

      // Act
      const user = await userService.createUser(userData);

      // Assert
      expect(user).toEqual(mockUser);
      expect(db.users.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: userData.email,
          name: userData.name
        })
      });
      expect(db.users.create).toHaveBeenCalledTimes(1);
    });

    it('should hash password before saving', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'plaintext',
        name: 'Test User'
      };

      await userService.createUser(userData);

      const createCall = vi.mocked(db.users.create).mock.calls[0][0];
      expect(createCall.data.password).not.toBe('plaintext');
      expect(createCall.data.password).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt format
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'Test123!@#',
        name: 'Test User'
      };

      vi.mocked(db.users.create).mockRejectedValue(
        new Error('Unique constraint violation')
      );

      await expect(userService.createUser(userData)).rejects.toThrow(
        'Email already exists'
      );
    });

    it('should validate email format', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'Test123!@#',
        name: 'Test User'
      };

      await expect(userService.createUser(userData)).rejects.toThrow(
        'Invalid email format'
      );
    });

    it('should validate password strength', async () => {
      const weakPasswords = [
        'short',           // Too short
        'nouppercase123',  // No uppercase
        'NOLOWERCASE123',  // No lowercase
        'NoNumbers!',      // No numbers
        'NoSpecial123'     // No special chars
      ];

      for (const password of weakPasswords) {
        const userData = {
          email: 'test@example.com',
          password,
          name: 'Test User'
        };

        await expect(userService.createUser(userData)).rejects.toThrow(
          'Password does not meet requirements'
        );
      }
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User'
      };

      vi.mocked(db.users.findUnique).mockResolvedValue(mockUser);

      const user = await userService.getUserById('123');

      expect(user).toEqual(mockUser);
      expect(db.users.findUnique).toHaveBeenCalledWith({
        where: { id: '123' }
      });
    });

    it('should return null when user not found', async () => {
      vi.mocked(db.users.findUnique).mockResolvedValue(null);

      const user = await userService.getUserById('nonexistent');

      expect(user).toBeNull();
    });
  });
});
```

**Pytest (Python):**
```python
# test_user_service.py
import pytest
from unittest.mock import Mock, patch
from user_service import UserService
from models import User

@pytest.fixture
def user_service():
    return UserService()

@pytest.fixture
def mock_db(mocker):
    return mocker.patch('user_service.db')

class TestUserService:
    def test_create_user_with_valid_data(self, user_service, mock_db):
        # Arrange
        user_data = {
            'email': 'test@example.com',
            'password': 'Test123!@#',
            'name': 'Test User'
        }
        
        mock_user = User(
            id='123',
            email=user_data['email'],
            name=user_data['name']
        )
        
        mock_db.users.create.return_value = mock_user
        
        # Act
        user = user_service.create_user(user_data)
        
        # Assert
        assert user == mock_user
        mock_db.users.create.assert_called_once()
        
    def test_create_user_hashes_password(self, user_service, mock_db):
        user_data = {
            'email': 'test@example.com',
            'password': 'plaintext',
            'name': 'Test User'
        }
        
        user_service.create_user(user_data)
        
        call_args = mock_db.users.create.call_args[0][0]
        assert call_args['password'] != 'plaintext'
        assert call_args['password'].startswith('$2b$')
        
    @pytest.mark.parametrize('email', [
        'invalid',
        '@example.com',
        'test@',
        'test@.com'
    ])
    def test_create_user_validates_email(self, user_service, email):
        user_data = {
            'email': email,
            'password': 'Test123!@#',
            'name': 'Test User'
        }
        
        with pytest.raises(ValueError, match='Invalid email'):
            user_service.create_user(user_data)
```

### 3.2 Integration Testing

**API Integration Tests:**
```typescript
// api.integration.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { db } from '../src/db';

describe('User API Integration Tests', () => {
  let authToken: string;

  beforeAll(async () => {
    // Setup test database
    await db.$connect();
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  describe('POST /api/users', () => {
    it('should create new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'newuser@example.com',
          password: 'Test123!@#',
          name: 'New User'
        })
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        email: 'newuser@example.com',
        name: 'New User'
      });
      expect(response.body.password).toBeUndefined(); // Never return password
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'invalid-email',
          password: 'Test123!@#',
          name: 'Test User'
        })
        .expect(400);

      expect(response.body).toMatchObject({
        error: expect.objectContaining({
          code: 'VALIDATION_ERROR',
          details: expect.arrayContaining([
            expect.objectContaining({
              field: 'email',
              message: expect.stringContaining('invalid')
            })
          ])
        })
      });
    });

    it('should return 409 for duplicate email', async () => {
      // Create first user
      await request(app)
        .post('/api/users')
        .send({
          email: 'duplicate@example.com',
          password: 'Test123!@#',
          name: 'First User'
        })
        .expect(201);

      // Try to create duplicate
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'duplicate@example.com',
          password: 'Different123!@#',
          name: 'Second User'
        })
        .expect(409);

      expect(response.body.error.code).toBe('DUPLICATE_EMAIL');
    });

    it('should rate limit registrations', async () => {
      // Make 100 requests (rate limit)
      const requests = Array(100).fill(null).map((_, i) =>
        request(app)
          .post('/api/users')
          .send({
            email: `user${i}@example.com`,
            password: 'Test123!@#',
            name: `User ${i}`
          })
      );

      await Promise.all(requests);

      // 101st request should be rate limited
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'ratelimited@example.com',
          password: 'Test123!@#',
          name: 'Rate Limited User'
        })
        .expect(429);

      expect(response.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeAll(async () => {
      // Create test user
      await request(app)
        .post('/api/users')
        .send({
          email: 'testuser@example.com',
          password: 'Test123!@#',
          name: 'Test User'
        });
    });

    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'Test123!@#'
        })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body.accessToken).toMatch(/^eyJ/); // JWT format

      authToken = response.body.accessToken;
    });

    it('should return 401 for wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'WrongPassword123!@#'
        })
        .expect(401);

      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should return 401 for nonexistent user', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Test123!@#'
        })
        .expect(401);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user with valid auth token', async () => {
      const createResponse = await request(app)
        .post('/api/users')
        .send({
          email: 'getuser@example.com',
          password: 'Test123!@#',
          name: 'Get User'
        });

      const userId = createResponse.body.id;

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: userId,
        email: 'getuser@example.com',
        name: 'Get User'
      });
    });

    it('should return 401 without auth token', async () => {
      await request(app)
        .get('/api/users/123')
        .expect(401);
    });

    it('should return 401 with invalid token', async () => {
      await request(app)
        .get('/api/users/123')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('should return 404 for nonexistent user', async () => {
      await request(app)
        .get('/api/users/nonexistent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
```

**Database Integration Tests:**
```typescript
// database.integration.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { db } from '../src/db';

describe('Database Integration Tests', () => {
  beforeAll(async () => {
    await db.$connect();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  beforeEach(async () => {
    // Clean database before each test
    await db.post.deleteMany();
    await db.user.deleteMany();
  });

  describe('User CRUD Operations', () => {
    it('should create user', async () => {
      const user = await db.user.create({
        data: {
          email: 'test@example.com',
          password: 'hashed',
          name: 'Test User'
        }
      });

      expect(user).toMatchObject({
        id: expect.any(String),
        email: 'test@example.com',
        name: 'Test User',
        createdAt: expect.any(Date)
      });
    });

    it('should enforce unique email constraint', async () => {
      await db.user.create({
        data: {
          email: 'unique@example.com',
          password: 'hashed',
          name: 'User 1'
        }
      });

      await expect(
        db.user.create({
          data: {
            email: 'unique@example.com',
            password: 'hashed',
            name: 'User 2'
          }
        })
      ).rejects.toThrow();
    });

    it('should cascade delete user posts', async () => {
      const user = await db.user.create({
        data: {
          email: 'cascade@example.com',
          password: 'hashed',
          name: 'Cascade User'
        }
      });

      await db.post.create({
        data: {
          title: 'Test Post',
          content: 'Content',
          authorId: user.id
        }
      });

      await db.user.delete({
        where: { id: user.id }
      });

      const posts = await db.post.findMany({
        where: { authorId: user.id }
      });

      expect(posts).toHaveLength(0);
    });
  });

  describe('Query Optimization', () => {
    it('should use index for email lookup', async () => {
      // Create 1000 users
      const users = Array(1000).fill(null).map((_, i) => ({
        email: `user${i}@example.com`,
        password: 'hashed',
        name: `User ${i}`
      }));

      await db.user.createMany({ data: users });

      // Measure query time
      const start = Date.now();
      await db.user.findUnique({
        where: { email: 'user500@example.com' }
      });
      const duration = Date.now() - start;

      // Should be fast with index (< 10ms)
      expect(duration).toBeLessThan(10);
    });

    it('should avoid N+1 queries with include', async () => {
      const user = await db.user.create({
        data: {
          email: 'n1@example.com',
          password: 'hashed',
          name: 'N+1 User'
        }
      });

      // Create 10 posts
      await db.post.createMany({
        data: Array(10).fill(null).map((_, i) => ({
          title: `Post ${i}`,
          content: `Content ${i}`,
          authorId: user.id
        }))
      });

      // Single query with include (no N+1)
      const start = Date.now();
      const userWithPosts = await db.user.findUnique({
        where: { id: user.id },
        include: { posts: true }
      });
      const duration = Date.now() - start;

      expect(userWithPosts?.posts).toHaveLength(10);
      expect(duration).toBeLessThan(50); // Should be fast
    });
  });
});
```

---

## 4. END-TO-END TESTING

### 4.1 Cypress

**Setup:**
```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    
    env: {
      apiUrl: 'http://localhost:3001/api',
      testUser: {
        email: 'test@example.com',
        password: 'Test123!@#'
      }
    },
    
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});
```

**Commands:**
```typescript
// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      createUser(userData: any): Chainable<any>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('not.include', '/login');
  });
});

Cypress.Commands.add('createUser', (userData) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/users`,
    body: userData
  }).then((response) => response.body);
});

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});
```

**E2E Tests:**
```typescript
// cypress/e2e/user-registration.cy.ts
describe('User Registration Flow', () => {
  beforeEach(() => {
    // Reset database
    cy.request('POST', `${Cypress.env('apiUrl')}/test/reset-db`);
  });

  it('should register new user successfully', () => {
    cy.visit('/register');
    
    // Fill form
    cy.getByTestId('name-input').type('John Doe');
    cy.getByTestId('email-input').type('john@example.com');
    cy.getByTestId('password-input').type('Test123!@#');
    cy.getByTestId('confirm-password-input').type('Test123!@#');
    
    // Accept terms
    cy.getByTestId('terms-checkbox').check();
    
    // Submit
    cy.getByTestId('register-button').click();
    
    // Verify success message
    cy.getByTestId('success-message')
      .should('be.visible')
      .and('contain', 'Registration successful');
    
    // Verify redirect to login
    cy.url().should('include', '/login');
    
    // Verify email sent (mock)
    cy.request('GET', `${Cypress.env('apiUrl')}/test/emails`)
      .its('body')
      .should('have.length', 1)
      .its(0)
      .should('deep.include', {
        to: 'john@example.com',
        subject: 'Verify your email'
      });
  });

  it('should show validation errors for invalid input', () => {
    cy.visit('/register');
    
    // Try to submit empty form
    cy.getByTestId('register-button').click();
    
    // Check validation errors
    cy.getByTestId('name-error')
      .should('be.visible')
      .and('contain', 'Name is required');
    
    cy.getByTestId('email-error')
      .should('be.visible')
      .and('contain', 'Email is required');
    
    cy.getByTestId('password-error')
      .should('be.visible')
      .and('contain', 'Password is required');
  });

  it('should validate email format', () => {
    cy.visit('/register');
    
    cy.getByTestId('email-input').type('invalid-email');
    cy.getByTestId('email-input').blur();
    
    cy.getByTestId('email-error')
      .should('be.visible')
      .and('contain', 'Invalid email format');
  });

  it('should validate password strength', () => {
    cy.visit('/register');
    
    const weakPasswords = [
      { password: 'short', error: 'at least 8 characters' },
      { password: 'nouppercase', error: 'uppercase letter' },
      { password: 'NOLOWERCASE', error: 'lowercase letter' },
      { password: 'NoNumbers', error: 'number' },
      { password: 'NoSpecial123', error: 'special character' }
    ];
    
    weakPasswords.forEach(({ password, error }) => {
      cy.getByTestId('password-input').clear().type(password);
      cy.getByTestId('password-input').blur();
      
      cy.getByTestId('password-error')
        .should('be.visible')
        .and('contain', error);
    });
  });

  it('should require password confirmation match', () => {
    cy.visit('/register');
    
    cy.getByTestId('password-input').type('Test123!@#');
    cy.getByTestId('confirm-password-input').type('Different123!@#');
    cy.getByTestId('confirm-password-input').blur();
    
    cy.getByTestId('confirm-password-error')
      .should('be.visible')
      .and('contain', 'Passwords do not match');
  });

  it('should prevent duplicate email registration', () => {
    // Create existing user
    cy.createUser({
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'Test123!@#'
    });
    
    // Try to register with same email
    cy.visit('/register');
    cy.getByTestId('name-input').type('New User');
    cy.getByTestId('email-input').type('existing@example.com');
    cy.getByTestId('password-input').type('Test123!@#');
    cy.getByTestId('confirm-password-input').type('Test123!@#');
    cy.getByTestId('terms-checkbox').check();
    cy.getByTestId('register-button').click();
    
    cy.getByTestId('error-message')
      .should('be.visible')
      .and('contain', 'Email already exists');
  });
});

// cypress/e2e/authentication.cy.ts
describe('Authentication Flow', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'Test123!@#'
  };

  beforeEach(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/test/reset-db`);
    cy.createUser(testUser);
  });

  it('should login successfully with correct credentials', () => {
    cy.visit('/login');
    
    cy.getByTestId('email-input').type(testUser.email);
    cy.getByTestId('password-input').type(testUser.password);
    cy.getByTestId('login-button').click();
    
    // Verify redirect to dashboard
    cy.url().should('include', '/dashboard');
    
    // Verify user info displayed
    cy.getByTestId('user-name').should('contain', testUser.name);
  });

  it('should show error for incorrect password', () => {
    cy.visit('/login');
    
    cy.getByTestId('email-input').type(testUser.email);
    cy.getByTestId('password-input').type('WrongPassword123!@#');
    cy.getByTestId('login-button').click();
    
    cy.getByTestId('error-message')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
    
    // Should stay on login page
    cy.url().should('include', '/login');
  });

  it('should persist session after page reload', () => {
    cy.login(testUser.email, testUser.password);
    cy.visit('/dashboard');
    
    // Reload page
    cy.reload();
    
    // Should still be logged in
    cy.url().should('include', '/dashboard');
    cy.getByTestId('user-name').should('contain', testUser.name);
  });

  it('should logout successfully', () => {
    cy.login(testUser.email, testUser.password);
    cy.visit('/dashboard');
    
    cy.getByTestId('logout-button').click();
    
    // Should redirect to login
    cy.url().should('include', '/login');
    
    // Should not be able to access protected page
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('should redirect to login when accessing protected page', () => {
    cy.visit('/dashboard');
    
    cy.url().should('include', '/login');
    cy.getByTestId('error-message')
      .should('be.visible')
      .and('contain', 'Please log in');
  });
});
```

### 4.2 Playwright

**Configuration:**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
});
```

**Tests:**
```typescript
// tests/e2e/registration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should register new user', async ({ page }) => {
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Password', { exact: true }).fill('Test123!@#');
    await page.getByLabel('Confirm Password').fill('Test123!@#');
    await page.getByRole('checkbox', { name: 'I agree to terms' }).check();
    
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByText('Registration successful')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should work on mobile', async ({ page }) => {
    // This test runs on Mobile Chrome and Mobile Safari projects
    await page.getByLabel('Name').fill('Mobile User');
    await page.getByLabel('Email').fill('mobile@example.com');
    await page.getByLabel('Password', { exact: true }).fill('Test123!@#');
    await page.getByLabel('Confirm Password').fill('Test123!@#');
    await page.getByRole('checkbox', { name: 'I agree to terms' }).check();
    
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page).toHaveURL(/.*login/);
  });
});
```

---

## 5. PERFORMANCE & LOAD TESTING

### 5.1 k6 Load Testing

**Basic Load Test:**
```javascript
// loadtest/basic.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp up to 20 users
    { duration: '1m', target: 20 },    // Stay at 20 users
    { duration: '30s', target: 100 },  // Ramp to 100 users
    { duration: '3m', target: 100 },   // Stay at 100 users
    { duration: '30s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% < 500ms, 99% < 1s
    http_req_failed: ['rate<0.01'],   // Error rate < 1%
    errors: ['rate<0.05'],             // Custom error rate < 5%
  },
};

export default function () {
  const BASE_URL = 'http://localhost:3000/api';
  
  // Register user
  const registerRes = http.post(`${BASE_URL}/users`, JSON.stringify({
    name: `User ${__VU}-${__ITER}`,
    email: `user${__VU}-${__ITER}@example.com`,
    password: 'Test123!@#'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  check(registerRes, {
    'registration successful': (r) => r.status === 201,
    'has user id': (r) => JSON.parse(r.body).id !== undefined
  }) || errorRate.add(1);
  
  sleep(1);
  
  // Login
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: `user${__VU}-${__ITER}@example.com`,
    password: 'Test123!@#'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
  
  check(loginRes, {
    'login successful': (r) => r.status === 200,
    'has access token': (r) => JSON.parse(r.body).accessToken !== undefined
  }) || errorRate.add(1);
  
  const token = JSON.parse(loginRes.body).accessToken;
  
  sleep(1);
  
  // Get user profile
  const profileRes = http.get(`${BASE_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  check(profileRes, {
    'profile fetch successful': (r) => r.status === 200,
    'profile has email': (r) => JSON.parse(r.body).email !== undefined
  }) || errorRate.add(1);
  
  sleep(1);
}
```

**Spike Test:**
```javascript
// loadtest/spike.js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },    // Warm up
    { duration: '1m', target: 10 },     // Normal load
    { duration: '10s', target: 1000 },  // Spike!
    { duration: '3m', target: 1000 },   // Sustain spike
    { duration: '10s', target: 10 },    // Recover
    { duration: '1m', target: 10 },     // Recovery
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/api/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
```

**Stress Test:**
```javascript
// loadtest/stress.js
export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp to 100
    { duration: '5m', target: 100 },   // Stay at 100
    { duration: '2m', target: 200 },   // Ramp to 200
    { duration: '5m', target: 200 },   // Stay at 200
    { duration: '2m', target: 300 },   // Ramp to 300
    { duration: '5m', target: 300 },   // Stay at 300
    { duration: '10m', target: 0 },    // Ramp down
  ],
};

// Find breaking point
```

**Soak Test:**
```javascript
// loadtest/soak.js
export const options = {
  stages: [
    { duration: '2m', target: 100 },    // Ramp up
    { duration: '24h', target: 100 },   // Run for 24 hours!
    { duration: '2m', target: 0 },      // Ramp down
  ],
};

// Detect memory leaks, resource exhaustion
```

### 5.2 Artillery

**Configuration:**
```yaml
# artillery.yml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 300
      arrivalRate: 50
      name: "Sustained load"
    - duration: 120
      arrivalRate: 100
      name: "Peak load"
  
  payload:
    path: "users.csv"
    fields:
      - "email"
      - "password"
  
  plugins:
    expect:
      outputFormat: "json"

scenarios:
  - name: "User flow"
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "{{ email }}"
            password: "{{ password }}"
          capture:
            - json: "$.accessToken"
              as: "token"
          expect:
            - statusCode: 200
            - contentType: json
            - hasProperty: accessToken
      
      - get:
          url: "/api/users/me"
          headers:
            Authorization: "Bearer {{ token }}"
          expect:
            - statusCode: 200
      
      - think: 2
      
      - post:
          url: "/api/posts"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            title: "Load Test Post"
            content: "This is a test post"
          expect:
            - statusCode: 201
```

**Run:**
```bash
artillery run artillery.yml --output report.json
artillery report report.json
```

---

*The file is getting very long. Should I continue with the remaining sections (6-15) with full detail in the next response?*


## 6. SECURITY TESTING (SAST/DAST)

### 6.1 SAST (Static Application Security Testing)

**SonarQube:**
```yaml
# sonar-project.properties
sonar.projectKey=myapp
sonar.projectName=My Application
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=tests
sonar.exclusions=**/*.test.ts,**/*.spec.ts,node_modules/**

sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.testExecutionReportPaths=coverage/test-report.xml

sonar.qualitygate.wait=true
```

**Snyk:**
```bash
# Scan for vulnerabilities
snyk test

# Monitor project
snyk monitor

# Fix vulnerabilities
snyk fix

# Container scanning
snyk container test myapp:latest

# IaC scanning
snyk iac test terraform/
```

**Semgrep:**
```yaml
# .semgrep.yml
rules:
  - id: hardcoded-secret
    patterns:
      - pattern: |
          $SECRET = "..."
      - metavariable-regex:
          metavariable: $SECRET
          regex: (password|secret|token|api[_-]?key)
    message: "Possible hardcoded secret"
    severity: ERROR
    languages: [javascript, typescript]

  - id: sql-injection
    patterns:
      - pattern: |
          db.query($QUERY + ...)
    message: "Possible SQL injection"
    severity: ERROR
    languages: [javascript, typescript]

  - id: unsafe-eval
    pattern: eval(...)
    message: "Unsafe use of eval()"
    severity: WARNING
    languages: [javascript]
```

**ESLint Security Plugins:**
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['security', 'no-secrets'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-non-literal-require': 'warn',
    'security/detect-possible-timing-attacks': 'warn',
    'security/detect-pseudoRandomBytes': 'error',
    'no-secrets/no-secrets': 'error'
  }
};
```

### 6.2 DAST (Dynamic Application Security Testing)

**OWASP ZAP:**
```bash
# Docker ZAP scan
docker run -v $(pwd):/zap/wrk/:rw \
  -t owasp/zap2docker-stable \
  zap-baseline.py \
  -t http://localhost:3000 \
  -r zap-report.html
```

**ZAP Automation:**
```yaml
# zap.yaml
env:
  contexts:
    - name: "myapp"
      urls:
        - "http://localhost:3000"
      includePaths:
        - "http://localhost:3000/.*"
      excludePaths:
        - "http://localhost:3000/logout"
      authentication:
        method: "form"
        parameters:
          loginUrl: "http://localhost:3000/login"
          loginRequestData: "email={%username%}&password={%password%}"
        verification:
          method: "response"
          loggedInRegex: "\\QLogout\\E"
          loggedOutRegex: "\\QLogin\\E"
      users:
        - name: "test@example.com"
          credentials:
            username: "test@example.com"
            password: "Test123!@#"

jobs:
  - type: spider
    parameters:
      context: "myapp"
      user: "test@example.com"
      maxDuration: 10

  - type: activeScan
    parameters:
      context: "myapp"
      user: "test@example.com"

  - type: report
    parameters:
      template: "traditional-html"
      reportDir: "reports"
      reportFile: "zap-report"
```

**Burp Suite:**
```bash
# Command-line scanner
java -jar burpsuite_pro.jar \
  --project-file=myapp.burp \
  --config-file=scan-config.json
```

---

## 7. PENETRATION TESTING

### 7.1 OWASP Top 10 Testing

**1. Injection (SQL, NoSQL, Command)**

```typescript
// Test cases
const injectionPayloads = [
  // SQL Injection
  "' OR '1'='1",
  "1' UNION SELECT NULL--",
  "' DROP TABLE users--",
  
  // NoSQL Injection
  "{ $ne: null }",
  "{ $gt: '' }",
  
  // Command Injection
  "; ls -la",
  "| cat /etc/passwd",
  "` whoami `"
];

describe('Injection Testing', () => {
  it('should prevent SQL injection', async () => {
    for (const payload of injectionPayloads) {
      const response = await request(app)
        .post('/api/users/search')
        .send({ email: payload })
        .expect(400); // Should reject, not crash
      
      expect(response.body.error).toBeDefined();
    }
  });
});
```

**2. Broken Authentication**

```typescript
describe('Authentication Security', () => {
  it('should lock account after 5 failed login attempts', async () => {
    // Attempt 5 failed logins
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);
    }
    
    // 6th attempt should be locked
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'correctpassword'
      })
      .expect(429);
    
    expect(response.body.error.code).toBe('ACCOUNT_LOCKED');
  });
  
  it('should invalidate old sessions on password change', async () => {
    const loginRes = await login('test@example.com', 'oldpassword');
    const oldToken = loginRes.body.accessToken;
    
    // Change password
    await request(app)
      .post('/api/users/change-password')
      .set('Authorization', `Bearer ${oldToken}`)
      .send({
        currentPassword: 'oldpassword',
        newPassword: 'newpassword'
      })
      .expect(200);
    
    // Old token should not work
    await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${oldToken}`)
      .expect(401);
  });
});
```

**3. Sensitive Data Exposure**

```typescript
describe('Data Exposure Prevention', () => {
  it('should not expose passwords in API responses', async () => {
    const response = await request(app)
      .get('/api/users/123')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);
    
    expect(response.body.password).toBeUndefined();
    expect(response.body.passwordHash).toBeUndefined();
  });
  
  it('should mask sensitive data in logs', async () => {
    await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'secret123',
        creditCard: '4111111111111111'
      });
    
    // Check logs
    const logs = await readLogs();
    expect(logs).not.toContain('secret123');
    expect(logs).not.toContain('4111111111111111');
    expect(logs).toContain('****'); // Masked
  });
});
```

**4. XML External Entities (XXE)**

```typescript
describe('XXE Prevention', () => {
  it('should reject malicious XML', async () => {
    const maliciousXML = `
      <?xml version="1.0"?>
      <!DOCTYPE foo [
        <!ENTITY xxe SYSTEM "file:///etc/passwd">
      ]>
      <data>&xxe;</data>
    `;
    
    await request(app)
      .post('/api/upload/xml')
      .set('Content-Type', 'application/xml')
      .send(maliciousXML)
      .expect(400);
  });
});
```

**5. Broken Access Control**

```typescript
describe('Access Control', () => {
  it('should prevent horizontal privilege escalation', async () => {
    const user1Token = (await login('user1@example.com')).body.accessToken;
    
    // Try to access user2's data
    await request(app)
      .get('/api/users/user2-id/orders')
      .set('Authorization', `Bearer ${user1Token}`)
      .expect(403);
  });
  
  it('should prevent vertical privilege escalation', async () => {
    const userToken = (await login('user@example.com')).body.accessToken;
    
    // Try to access admin endpoint
    await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
  });
});
```

**6. Security Misconfiguration**

```typescript
describe('Security Configuration', () => {
  it('should have secure HTTP headers', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('DENY');
    expect(response.headers['x-xss-protection']).toBe('1; mode=block');
    expect(response.headers['strict-transport-security']).toContain('max-age');
  });
  
  it('should not expose server version', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.headers['server']).toBeUndefined();
    expect(response.headers['x-powered-by']).toBeUndefined();
  });
  
  it('should disable directory listing', async () => {
    await request(app)
      .get('/uploads/')
      .expect(404); // Not 200 with file list
  });
});
```

**7. Cross-Site Scripting (XSS)**

```typescript
describe('XSS Prevention', () => {
  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '<svg onload=alert("XSS")>',
    'javascript:alert("XSS")',
    '<iframe src="javascript:alert(\'XSS\')"></iframe>'
  ];
  
  it('should sanitize user input', async () => {
    for (const payload of xssPayloads) {
      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          title: payload,
          content: payload
        })
        .expect(201);
      
      // Check sanitized output
      expect(response.body.title).not.toContain('<script>');
      expect(response.body.content).not.toContain('<script>');
    }
  });
  
  it('should set Content-Security-Policy', async () => {
    const response = await request(app).get('/');
    
    expect(response.headers['content-security-policy']).toContain("default-src 'self'");
    expect(response.headers['content-security-policy']).toContain("script-src 'self'");
  });
});
```

**8. Insecure Deserialization**

```typescript
describe('Deserialization Security', () => {
  it('should validate JSON structure', async () => {
    const maliciousJSON = {
      __proto__: { isAdmin: true }
    };
    
    await request(app)
      .post('/api/users')
      .send(maliciousJSON)
      .expect(400);
  });
});
```

**9. Using Components with Known Vulnerabilities**

```bash
# npm audit
npm audit

# Snyk
snyk test

# OWASP Dependency-Check
dependency-check --project myapp --scan .
```

**10. Insufficient Logging & Monitoring**

```typescript
describe('Logging & Monitoring', () => {
  it('should log failed login attempts', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
      .expect(401);
    
    const logs = await readSecurityLogs();
    expect(logs).toContainEqual(
      expect.objectContaining({
        event: 'LOGIN_FAILED',
        email: 'test@example.com',
        ip: expect.any(String)
      })
    );
  });
  
  it('should log privilege escalation attempts', async () => {
    const userToken = (await login('user@example.com')).body.accessToken;
    
    await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
    
    const logs = await readSecurityLogs();
    expect(logs).toContainEqual(
      expect.objectContaining({
        event: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        userId: expect.any(String),
        endpoint: '/api/admin/users'
      })
    );
  });
});
```

### 7.2 Manual Penetration Testing

**Reconnaissance:**
```bash
# DNS enumeration
nslookup myapp.com
dig myapp.com ANY

# Subdomain enumeration
subfinder -d myapp.com
amass enum -d myapp.com

# Port scanning
nmap -sS -p- myapp.com
nmap -sV -p 80,443,3000 myapp.com

# Technology detection
whatweb myapp.com
wappalyzer myapp.com
```

**Vulnerability Scanning:**
```bash
# Nikto web scanner
nikto -h http://myapp.com

# SQLMap
sqlmap -u "http://myapp.com/search?q=test" --batch --risk=3 --level=5

# XSStrike
python xsstrike.py -u "http://myapp.com/search?q="

# SSRF testing
python ssrfmap.py -r request.txt
```

---

## 8. VULNERABILITY MANAGEMENT

### 8.1 Vulnerability Tracking

**Severity Classification:**
```
CRITICAL (9.0-10.0):
- Remote code execution
- SQL injection in production
- Authentication bypass
- Sensitive data exposure

HIGH (7.0-8.9):
- XSS (stored)
- CSRF
- Privilege escalation
- Known CVE with exploit

MEDIUM (4.0-6.9):
- XSS (reflected)
- Information disclosure
- Missing security headers

LOW (0.1-3.9):
- Directory listing
- Verbose error messages
- Missing best practices
```

**Vulnerability Report Template:**
```markdown
# VULNERABILITY REPORT

**ID:** VULN-2024-001
**Title:** SQL Injection in User Search
**Severity:** CRITICAL (CVSS 9.8)
**Status:** Open / In Progress / Fixed / Won't Fix

## Description
The user search endpoint is vulnerable to SQL injection due to
unsanitized input in the WHERE clause.

## Affected Component
- Endpoint: POST /api/users/search
- File: src/controllers/userController.ts:45
- Introduced: v1.2.0 (commit abc123)

## Proof of Concept
```bash
curl -X POST http://localhost:3000/api/users/search \
  -H "Content-Type: application/json" \
  -d '{"email": "' OR '1'='1"}'

# Returns all users (bypasses authentication)
```

## Impact
- **Confidentiality:** HIGH (all user data exposed)
- **Integrity:** HIGH (data modification possible)
- **Availability:** MEDIUM (DoS via DROP TABLE)

## Affected Users
- All users (production)
- Estimated impact: 50,000 users

## Remediation
**Immediate (Hotfix):**
1. Deploy WAF rule to block SQL injection patterns
2. Rate limit search endpoint

**Permanent (Fix):**
1. Use parameterized queries
2. Add input validation
3. Implement prepared statements

**Code Fix:**
```typescript
// Before (vulnerable)
const users = await db.query(`
  SELECT * FROM users WHERE email = '${email}'
`);

// After (fixed)
const users = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);
```

## Timeline
- **Discovered:** 2024-01-15 10:00
- **Reported:** 2024-01-15 10:30
- **Acknowledged:** 2024-01-15 11:00
- **Fixed:** 2024-01-15 14:00
- **Deployed:** 2024-01-15 15:00
- **Verified:** 2024-01-15 16:00

## References
- OWASP: https://owasp.org/www-community/attacks/SQL_Injection
- CWE-89: https://cwe.mitre.org/data/definitions/89.html
```

### 8.2 Patch Management

**Process:**
```markdown
1. Vulnerability Discovery
   ↓
2. Severity Assessment (CVSS)
   ↓
3. Prioritization
   - Critical: 24 hours
   - High: 7 days
   - Medium: 30 days
   - Low: Next release
   ↓
4. Fix Development
   ↓
5. Testing (QA + Security)
   ↓
6. Deployment
   ↓
7. Verification
   ↓
8. Communication (stakeholders)
```

---

## 9. SECURITY COMPLIANCE

### 9.1 GDPR Compliance

**Data Protection Checklist:**
```markdown
✅ Data Minimization
- Collect only necessary data
- Retention policies defined
- Automatic data deletion

✅ Consent Management
- Explicit consent for data collection
- Granular consent options
- Easy withdrawal process

✅ Right to Access
- Users can download their data
- API endpoint: GET /api/users/me/data
- Format: JSON or CSV

✅ Right to Erasure
- Users can delete their account
- API endpoint: DELETE /api/users/me
- Cascading deletion

✅ Data Portability
- Export in machine-readable format
- Include all personal data

✅ Privacy by Design
- Encryption at rest and in transit
- Pseudonymization where possible
- Access controls

✅ Data Breach Notification
- Process in place (< 72 hours)
- Contact: dpo@company.com
```

**Testing:**
```typescript
describe('GDPR Compliance', () => {
  it('should allow user to download their data', async () => {
    const response = await request(app)
      .get('/api/users/me/data')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);
    
    expect(response.body).toMatchObject({
      personalData: {
        email: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String)
      },
      activityData: {
        posts: expect.any(Array),
        comments: expect.any(Array)
      }
    });
  });
  
  it('should delete user data on account deletion', async () => {
    const user = await createTestUser();
    const token = (await login(user.email, user.password)).body.accessToken;
    
    await request(app)
      .delete('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
    
    // Verify data deleted
    const dbUser = await db.users.findUnique({ where: { id: user.id } });
    expect(dbUser).toBeNull();
    
    // Verify related data deleted
    const posts = await db.posts.findMany({ where: { authorId: user.id } });
    expect(posts).toHaveLength(0);
  });
});
```

### 9.2 SOC 2 Compliance

**Access Control Testing:**
```typescript
describe('SOC 2 - Access Controls', () => {
  it('should enforce least privilege', async () => {
    const userToken = (await login('user@example.com')).body.accessToken;
    
    // User should only access their own data
    await request(app)
      .get('/api/users/other-user-id')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
  });
  
  it('should log all access attempts', async () => {
    await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    
    const auditLogs = await db.auditLogs.findMany({
      where: {
        action: 'ACCESS_ADMIN_ENDPOINT',
        resource: '/api/admin/users'
      }
    });
    
    expect(auditLogs.length).toBeGreaterThan(0);
  });
});
```

**Encryption Testing:**
```typescript
describe('SOC 2 - Encryption', () => {
  it('should encrypt sensitive data at rest', async () => {
    const user = await db.users.create({
      data: {
        email: 'test@example.com',
        password: 'plaintextpassword',
        ssn: '123-45-6789'
      }
    });
    
    // Check database directly
    const rawUser = await db.$queryRaw`
      SELECT password, ssn FROM users WHERE id = ${user.id}
    `;
    
    expect(rawUser[0].password).not.toBe('plaintextpassword');
    expect(rawUser[0].ssn).not.toBe('123-45-6789');
  });
  
  it('should use TLS for all connections', async () => {
    const response = await request('http://myapp.com')
      .get('/api/health');
    
    // Should redirect to HTTPS
    expect(response.status).toBe(301);
    expect(response.headers.location).toMatch(/^https:/);
  });
});
```

---

## 10. API SECURITY TESTING

### 10.1 REST API Security

**Authentication Testing:**
```typescript
describe('API Authentication', () => {
  it('should reject requests without token', async () => {
    await request(app)
      .get('/api/users/me')
      .expect(401);
  });
  
  it('should reject expired tokens', async () => {
    const expiredToken = jwt.sign(
      { userId: '123' },
      'secret',
      { expiresIn: '-1h' } // Expired 1 hour ago
    );
    
    await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401);
  });
  
  it('should reject tampered tokens', async () => {
    const validToken = (await login('test@example.com')).body.accessToken;
    const tamperedToken = validToken.slice(0, -5) + 'xxxxx';
    
    await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${tamperedToken}`)
      .expect(401);
  });
});
```

**Rate Limiting:**
```typescript
describe('API Rate Limiting', () => {
  it('should limit requests per user', async () => {
    const token = (await login('test@example.com')).body.accessToken;
    
    // Make 100 requests (limit)
    for (let i = 0; i < 100; i++) {
      await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    }
    
    // 101st should be rate limited
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(429);
    
    expect(response.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(response.headers['retry-after']).toBeDefined();
  });
});
```

**Input Validation:**
```typescript
describe('API Input Validation', () => {
  it('should validate content-type', async () => {
    await request(app)
      .post('/api/users')
      .set('Content-Type', 'text/plain')
      .send('not json')
      .expect(415); // Unsupported Media Type
  });
  
  it('should validate request size', async () => {
    const largePayload = { data: 'x'.repeat(10 * 1024 * 1024) }; // 10MB
    
    await request(app)
      .post('/api/users')
      .send(largePayload)
      .expect(413); // Payload Too Large
  });
  
  it('should sanitize file uploads', async () => {
    await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from('<?php system($_GET["cmd"]); ?>'), 'shell.php')
      .expect(400);
  });
});
```

### 10.2 GraphQL Security

**Query Depth Limiting:**
```typescript
import depthLimit from 'graphql-depth-limit';

const server = new ApolloServer({
  validationRules: [depthLimit(5)]
});

// Test
describe('GraphQL Security', () => {
  it('should reject deeply nested queries', async () => {
    const deepQuery = `
      query {
        user {
          posts {
            author {
              posts {
                author {
                  posts {
                    author {
                      posts {
                        # Too deep!
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const response = await request(app)
      .post('/graphql')
      .send({ query: deepQuery })
      .expect(400);
    
    expect(response.body.errors[0].message).toContain('exceeds maximum');
  });
});
```

**Query Complexity:**
```typescript
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  validationRules: [
    createComplexityLimitRule(1000)
  ]
});
```

---

## 11. MOBILE & WEB SECURITY

### 11.1 Mobile App Security (OWASP MASVS)

**Certificate Pinning Test:**
```kotlin
// Android
@Test
fun testCertificatePinning() {
    val interceptor = CertificatePinner.Builder()
        .add("api.myapp.com", "sha256/AAAAAAAAAA...")
        .build()
    
    val client = OkHttpClient.Builder()
        .certificatePinner(interceptor)
        .build()
    
    // Should succeed with valid cert
    val request = Request.Builder()
        .url("https://api.myapp.com/health")
        .build()
    
    val response = client.newCall(request).execute()
    assertEquals(200, response.code)
    
    // Should fail with invalid cert (MITM)
    // Test with proxy like Charles or Burp
}
```

**Root Detection:**
```kotlin
@Test
fun testRootDetection() {
    val isRooted = RootBeer(context).isRooted
    
    if (isRooted) {
        // App should refuse to run
        assertFalse(app.canStart())
    }
}
```

### 11.2 Browser Security

**CSP Testing:**
```typescript
describe('Content Security Policy', () => {
  it('should have strict CSP', async () => {
    const response = await request(app).get('/');
    
    const csp = response.headers['content-security-policy'];
    
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
    expect(csp).not.toContain("'unsafe-eval'");
  });
});
```

**CORS Testing:**
```typescript
describe('CORS Configuration', () => {
  it('should only allow whitelisted origins', async () => {
    const response = await request(app)
      .get('/api/health')
      .set('Origin', 'https://evil.com')
      .expect(200);
    
    expect(response.headers['access-control-allow-origin']).toBeUndefined();
  });
  
  it('should allow valid origin', async () => {
    const response = await request(app)
      .get('/api/health')
      .set('Origin', 'https://myapp.com')
      .expect(200);
    
    expect(response.headers['access-control-allow-origin']).toBe('https://myapp.com');
  });
});
```

---

## 12. CODE REVIEW & SECURITY ANALYSIS

### 12.1 Secure Code Review Checklist

**Authentication & Session Management:**
```markdown
✅ Passwords hashed with bcrypt/scrypt/Argon2
✅ Minimum password strength enforced
✅ MFA available for sensitive accounts
✅ Session tokens cryptographically random
✅ Tokens expire (short-lived access tokens)
✅ Refresh token rotation implemented
✅ Account lockout after failed attempts
✅ Session invalidation on logout
✅ Old sessions invalidated on password change
```

**Input Validation:**
```markdown
✅ Whitelist validation (not blacklist)
✅ Type checking enforced
✅ Length limits on all inputs
✅ SQL queries parameterized
✅ NoSQL injection prevention
✅ Command injection prevention
✅ Path traversal prevention
✅ File upload restrictions (type, size)
```

**Output Encoding:**
```markdown
✅ HTML encoding for user content
✅ JavaScript encoding in JS context
✅ URL encoding for URLs
✅ Content-Security-Policy header
✅ X-Content-Type-Options: nosniff
✅ X-Frame-Options: DENY
```

**Access Control:**
```markdown
✅ Authorization checked on every request
✅ Principle of least privilege
✅ Role-based access control (RBAC)
✅ Resource-level permissions
✅ No client-side access control only
✅ Insecure direct object references prevented
```

**Cryptography:**
```markdown
✅ TLS 1.2+ only
✅ Strong cipher suites
✅ Sensitive data encrypted at rest
✅ Random values cryptographically secure
✅ No hardcoded secrets
✅ Secrets in environment variables
✅ Key rotation process defined
```

**Error Handling:**
```markdown
✅ Generic error messages to users
✅ Detailed errors logged server-side
✅ No stack traces exposed
✅ Fail securely (deny by default)
```

**Logging & Monitoring:**
```markdown
✅ Authentication events logged
✅ Authorization failures logged
✅ Input validation failures logged
✅ Sensitive data not logged
✅ Logs centrally aggregated
✅ Log tampering prevented
✅ Alerts for security events
```

---

## 13. INCIDENT RESPONSE & FORENSICS

### 13.1 Incident Response Plan

**Phases:**
```markdown
1. PREPARATION
   - IR team identified
   - Tools and access ready
   - Runbooks documented
   - Regular drills conducted

2. DETECTION & ANALYSIS
   - Monitor security alerts
   - Analyze logs and metrics
   - Determine incident scope
   - Classify severity

3. CONTAINMENT
   - Short-term: Isolate affected systems
   - Long-term: Apply patches, change credentials
   - Preserve evidence

4. ERADICATION
   - Remove malware/backdoors
   - Close vulnerabilities
   - Strengthen defenses

5. RECOVERY
   - Restore systems from clean backups
   - Verify integrity
   - Monitor for re-infection
   - Gradual service restoration

6. POST-INCIDENT
   - Root cause analysis
   - Lessons learned
   - Update defenses
   - Communication (internal/external)
```

**Incident Classification:**
```
P1 (CRITICAL):
- Data breach (customer data)
- Ransomware
- Complete service outage
- Active exploitation

P2 (HIGH):
- Partial data exposure
- Defacement
- Major service degradation
- Privilege escalation

P3 (MEDIUM):
- DoS attack (mitigated)
- Malware detected (contained)
- Policy violations

P4 (LOW):
- Suspicious activity (no impact)
- Failed intrusion attempt
```

### 13.2 Digital Forensics

**Evidence Collection:**
```bash
# Memory dump
sudo dd if=/dev/mem of=/mnt/evidence/memory.dump

# Disk image
sudo dd if=/dev/sda of=/mnt/evidence/disk.img bs=4M status=progress

# Network capture
sudo tcpdump -i eth0 -w /mnt/evidence/network.pcap

# Process list
ps aux > /mnt/evidence/processes.txt

# Network connections
netstat -tulpn > /mnt/evidence/connections.txt

# Log files
tar czf /mnt/evidence/logs.tar.gz /var/log/
```

**Timeline Analysis:**
```bash
# Parse logs
grep "2024-01-15" /var/log/auth.log | sort

# Failed login attempts
awk '/Failed password/ {print $1, $2, $3, $11}' /var/log/auth.log

# Successful logins
awk '/Accepted/ {print $1, $2, $3, $9, $11}' /var/log/auth.log
```

---

## 14. COMPLIANCE FRAMEWORKS

### 14.1 PCI DSS

**Requirements Checklist:**
```markdown
✅ Requirement 1: Install and maintain firewall
✅ Requirement 2: Don't use vendor defaults
✅ Requirement 3: Protect stored cardholder data
✅ Requirement 4: Encrypt transmission of cardholder data
✅ Requirement 5: Protect against malware
✅ Requirement 6: Develop secure systems
✅ Requirement 7: Restrict access by business need
✅ Requirement 8: Identify and authenticate access
✅ Requirement 9: Restrict physical access
✅ Requirement 10: Track and monitor access
✅ Requirement 11: Regularly test security
✅ Requirement 12: Maintain security policy
```

### 14.2 HIPAA

**Security Testing:**
```typescript
describe('HIPAA Compliance', () => {
  it('should encrypt PHI at rest', async () => {
    const patient = await db.patients.create({
      data: {
        name: 'John Doe',
        ssn: '123-45-6789',
        diagnosis: 'Type 2 Diabetes'
      }
    });
    
    const rawData = await db.$queryRaw`
      SELECT ssn, diagnosis FROM patients WHERE id = ${patient.id}
    `;
    
    expect(rawData[0].ssn).not.toBe('123-45-6789');
    expect(rawData[0].diagnosis).not.toBe('Type 2 Diabetes');
  });
  
  it('should log all PHI access', async () => {
    await request(app)
      .get('/api/patients/123')
      .set('Authorization', `Bearer ${doctorToken}`)
      .expect(200);
    
    const auditLog = await db.auditLogs.findMany({
      where: {
        action: 'PHI_ACCESS',
        resourceType: 'patient',
        resourceId: '123'
      }
    });
    
    expect(auditLog.length).toBeGreaterThan(0);
  });
});
```

---

## 15. RESPONSE FORMATS

### 15.1 Test Report Template

```markdown
# QA TEST REPORT

**Project:** [Name]
**Version:** [1.0.0]
**Test Cycle:** [Sprint 10]
**Date:** [2024-01-15]
**QA Engineer:** [Name]

---

## SUMMARY

**Test Execution:**
- Total: 250 tests
- Passed: 240 (96%)
- Failed: 8 (3.2%)
- Blocked: 2 (0.8%)

**Code Coverage:**
- Overall: 85%
- Unit: 92%
- Integration: 78%
- E2E: 65%

**Defects:**
- Critical: 0
- High: 2
- Medium: 5
- Low: 8

---

## TEST RESULTS BY CATEGORY

**Unit Tests:** ✅ PASS (100%)
**Integration Tests:** ✅ PASS (98%)
**E2E Tests:** ⚠️ PARTIAL (90%)
**Performance Tests:** ✅ PASS
**Security Tests:** ⚠️ ISSUES FOUND

---

## DEFECTS

**DEF-001 (HIGH):**
- **Title:** SQL injection in search
- **Status:** In Progress
- **Assigned:** Backend Team
- **ETA:** 2024-01-16

**DEF-002 (MEDIUM):**
- **Title:** XSS in profile bio
- **Status:** Fixed, pending verification
- **Assigned:** Frontend Team

---

## RECOMMENDATIONS

1. Increase E2E coverage for checkout flow
2. Address security vulnerabilities before release
3. Performance: Optimize /api/users endpoint (currently 800ms)

---

## SIGN-OFF

✅ **Ready for Production:** NO
❌ **Blockers:** 2 High-priority security issues
```

### 15.2 Security Audit Report

```markdown
# SECURITY AUDIT REPORT

**Application:** MyApp
**Version:** 1.0.0
**Audit Date:** 2024-01-15
**Auditor:** [Security Team]
**Methodology:** OWASP Top 10, Manual Pentest, SAST/DAST

---

## EXECUTIVE SUMMARY

**Overall Security Posture:** MEDIUM

**Critical Findings:** 1
**High Findings:** 3
**Medium Findings:** 8
**Low Findings:** 12

---

## FINDINGS

### CRITICAL-001: SQL Injection

**Severity:** CRITICAL (CVSS 9.8)
**Affected:** POST /api/users/search
**Risk:** Complete database compromise

**Description:**
User search endpoint vulnerable to SQL injection.

**PoC:**
```bash
curl -X POST /api/users/search \
  -d '{"email": "' OR '1'='1"}'
```

**Recommendation:**
Use parameterized queries immediately.

---

### HIGH-001: Broken Authentication

**Severity:** HIGH (CVSS 8.2)
**Affected:** Session management
**Risk:** Account takeover

**Description:**
Session tokens don't expire.

**Recommendation:**
Implement 15-minute token expiration with refresh tokens.

---

## COMPLIANCE STATUS

**OWASP Top 10:**
- A1 Injection: ❌ FAIL
- A2 Broken Authentication: ❌ FAIL
- A3 Sensitive Data Exposure: ✅ PASS
- A4 XXE: ✅ PASS
- A5 Broken Access Control: ⚠️ PARTIAL
- A6 Security Misconfiguration: ⚠️ PARTIAL
- A7 XSS: ✅ PASS
- A8 Insecure Deserialization: ✅ PASS
- A9 Using Components with Known Vulnerabilities: ⚠️ PARTIAL
- A10 Insufficient Logging: ⚠️ PARTIAL

---

## RECOMMENDATIONS

**Immediate (24-48h):**
1. Fix SQL injection (CRITICAL-001)
2. Implement session expiration (HIGH-001)

**Short-term (1-2 weeks):**
1. Update vulnerable dependencies
2. Implement comprehensive logging

**Long-term:**
1. Security training for developers
2. Regular penetration testing (quarterly)
3. Bug bounty program

---

## CONCLUSION

Application has critical security issues that MUST be addressed
before production deployment. After fixes, re-audit recommended.
```

---

## CONCLUSION

The QA/Security Engineer ensures **quality and security throughout the SDLC**.

**Core Responsibilities:**
1. ✅ Design and execute test strategies
2. ✅ Automated testing (unit, integration, E2E)
3. ✅ Security testing (SAST, DAST, pentest)
4. ✅ Vulnerability management
5. ✅ Compliance validation (GDPR, SOC2, PCI)
6. ✅ Incident response
7. ✅ Security training

**Key Principles:**
- **Shift Left:** Test and secure early in SDLC
- **Automation:** Automate repetitive tests
- **Defense in Depth:** Multiple security layers
- **Continuous Testing:** Every commit, every deployment
- **Security is Everyone's Job:** But QA/Security leads

**Remember:**
> "Quality is not an act, it is a habit. Security is not a product, it is a process. Test everything, trust nothing, verify always."

---

*End of QA/Security Engineer Skill Document*
*Version 1.0.0*
*Role: Quality Assurance & Security Engineering*
