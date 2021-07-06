
export function getPasswordStrength(password)
{
    let score = 0;
    if (isEmpty(password)) 
    return 0;
    if (hasMinimumLength(password, 5)) score++;
    if (hasMinimumLength(password, 8)) score++;
    if (hasUpperCaseLetter(password) && hasLowerCaseLetter(password)) score++;
    if (hasDigit(password)) score++;
    if (hasSpecialChar(password)) score++;
    return score;
}

export function isStrongPassword(password)
        {
            return hasMinimumLength(password, 8)
                && hasUpperCaseLetter(password)
                && hasLowerCaseLetter(password)
                && (hasDigit(password) || hasSpecialChar(password));
        }

export function isValidPassword(password, opts)
        {
            return isValidPassword2(
                password,
                opts.RequiredLength,
                opts.RequiredUniqueChars,
                opts.RequireNonAlphanumeric,
                opts.RequireLowercase,
                opts.RequireUppercase,
                opts.RequireDigit);
        }


export function isValidPassword2(
     password,
    requiredLength,
    requiredUniqueChars,
    requireNonAlphanumeric,
    requireLowercase,
    requireUppercase,
    requireDigit)
{
    if (!hasMinimumLength(password, requiredLength)) return false;
    if (!hasMinimumUniqueChars(password, requiredUniqueChars)) return false;
    if (requireNonAlphanumeric && !hasSpecialChar(password)) return false;
    if (requireLowercase && !hasLowerCaseLetter(password)) return false;
    if (requireUppercase && !hasUpperCaseLetter(password)) return false;
    if (requireDigit && !hasDigit(password)) return false;
    return true;
}

export function hasMinimumLength(password, minLength)
{
    return password.length >= minLength;
}
export function hasMinimumUniqueChars(password,minUniqueChars)
{
    return countUniqueChars(password) >= minUniqueChars;
}
export function hasDigit(password)
{
    const format  = /\d/;   
    return format.test(password);
}
export function hasSpecialChar(password)
{
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(password);
}

export function hasUpperCaseLetter(password)
{
    return password.toLowerCase() != password;
}

export function hasLowerCaseLetter(password)
{
    return password.toUpperCase() != password;
}

function countUniqueChars(str) 
{
   const g={};
    str=str.toLowerCase();
    for (let char of str) 
      {
        g[char]=0;
      } 
    return Object.keys(g).length;
}
function isEmpty(str) {
    return (!str || str.length === 0 );
}
    
    