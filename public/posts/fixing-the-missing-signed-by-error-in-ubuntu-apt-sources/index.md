---
title: Fixing the "Missing Signed-By in the sources.list(5) entry" Error on Ubuntu
date: '2025-02-24'
description: Encountering the “Missing Signed-By in the sources.list(5) entry” error on Ubuntu? This guide explains why it happens and provides step-by-step solutions to fix APT source configurations and ensure secure updates. 🚀
---

If you've encountered the error message `"Missing Signed-By in the sources.list(5) entry"` while running `sudo apt update` on Ubuntu, don't worry. This issue occurs due to missing GPG key references in your APT sources configuration. This guide will help you identify the problem and provide step-by-step instructions to fix it.

## Understanding the Error

When running sudo apt update, you might see output like this:

```shell
N: Missing Signed-By in the sources.list(5) entry for 'http://ap-singapore-1-ad-1.clouds.archive.ubuntu.com/ubuntu'
N: Missing Signed-By in the sources.list(5) entry for 'http://security.ubuntu.com/ubuntu'
```

Ubuntu now enforces the use of GPG keys for verifying package repositories, and if a source entry is missing the `Signed-By` directive, APT may issue warnings or fail to fetch updates.

## Step 1: Check Your APT Source Configuration

First, let's check if there are any problematic entries in your APT sources by running:

```shell
grep -r '^deb ' /etc/apt/
```

Example output:

```shell
/etc/apt/sources.list.distUpgrade:deb http://ap-singapore-1-ad-1.clouds.archive.ubuntu.com/ubuntu/ noble main restricted
/etc/apt/sources.list.distUpgrade:deb http://security.ubuntu.com/ubuntu noble-security main restricted
```

If you see entries like these without `Signed-By`, they may be causing the issue.

## Step 2: Fix the Issue

### Option 1: Modify /etc/apt/sources.list

If your sources are stored in `/etc/apt/sources.list`, open the file:

```shell
sudo nano /etc/apt/sources.list
```

Modify the lines to include the Signed-By option, like this:

```shell
deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] http://ap-singapore-1-ad-1.clouds.archive.ubuntu.com/ubuntu noble main restricted universe multiverse
deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] http://security.ubuntu.com/ubuntu noble-security main restricted universe multiverse
```

Save the file (`Ctrl + X`, then `Y`, then `Enter`).

### Option 2: Check /etc/apt/sources.list.d/

If Ubuntu is using a newer APT sources format, check the directory:

```shell
ls -l /etc/apt/sources.list.d/
```

If there are `.list` files, edit them and add the `Signed-By` directive as shown above.

### Option 3: Remove Old Upgrade Files

If you found entries inside `/etc/apt/sources.list.distUpgrade`, they might be leftovers from an upgrade. To fix this, move the file:

```shell
sudo mv /etc/apt/sources.list.distUpgrade /etc/apt/sources.list.distUpgrade.bak
```

## Step 3: Update and Verify

After making the changes, clear the APT cache and update again:

```shell
sudo rm -rf /var/lib/apt/lists/\*
sudo apt update
```

If everything is configured correctly, `apt update` should run without warnings.

## Conclusion

The **"Missing Signed-By"** error occurs because Ubuntu now requires explicit GPG key verification for repositories. By properly configuring your sources.list files and adding the necessary `Signed-By` entries, you can resolve this issue and ensure secure updates.

I hope this guide helps you fix the problem! 🚀
