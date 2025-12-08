# GitHub Setup for RareUI

This directory contains GitHub-specific configuration files for the RareUI repository.

## Issue Templates

We have two issue templates:

### 🐛 Bug Report (`bug_report.yml`)
Use this template to report bugs or issues with components
- Requires component name, reproduction steps, environment details
- Auto-labels as `bug` and `triage`

### 💡 Feature Request (`feature_request.yml`)
Use this template to suggest new features or components
- Requires feature description, problem it solves, proposed solution
- Auto-labels as `enhancement` and `feature-request`

## Discussion Templates

### 💡 Feature Idea (`feature-idea.md`)
For discussing potential features before creating formal feature requests

### 🎨 Show and Tell (`show-and-tell.md`)
For sharing projects built with RareUI

## Configuration

### `config.yml`
- Disables blank issues (users must choose a template)
- Provides helpful links to:
  - GitHub Discussions
  - Documentation
  - Twitter/X
  - Q&A section

## How to Use

### For Bug Reports:
1. Go to: https://github.com/Codewithswappy/RareUI/issues/new/choose
2. Select "Bug Report"
3. Fill out the form
4. Submit

### For Feature Requests:
1. Go to: https://github.com/Codewithswappy/RareUI/issues/new/choose
2. Select "Feature Request"
3. Fill out the form
4. Submit

### For Discussions:
1. Go to: https://github.com/Codewithswappy/RareUI/discussions
2. Click "New discussion"
3. Choose appropriate category
4. Use template if available
5. Post!

## Maintaining

### Adding New Templates:
1. Create new `.yml` file in `ISSUE_TEMPLATE/`
2. Follow GitHub's issue form schema
3. Test by creating a test issue

### Modifying Templates:
1. Edit the `.yml` file
2. Changes appear immediately on GitHub
3. Test to ensure form works correctly

## Resources

- [GitHub Issue Templates Docs](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository)
- [GitHub Discussions Docs](https://docs.github.com/en/discussions)
