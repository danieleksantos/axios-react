import styled from 'styled-components'
import { type PrimaryColorProps } from './types'

export const COLOR_GITHUB = '#007bff'
export const COLOR_CEP = '#6f42c1'
export const COLOR_COUNTRIES = '#28a745'
export const COLOR_ERROR = '#dc3545'

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 32px 16px;
  font-family: 'Arial', sans-serif;
`

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  color: #333;
  margin-bottom: 40px;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`

export const Card = styled.div`
  background-color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto 32px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 30px auto;
  max-width: 400px;
`

export const Subtitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 15px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`

const BaseButton = styled.button`
  padding: 12px 20px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }
`

export const ClearButton = styled(BaseButton)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`

export const ErrorMessage = styled.div`
  color: ${COLOR_ERROR};
  font-size: 0.95rem;
  margin-top: 15px;
  background-color: #ffe0e0;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ffb3b3;
`

export const ErrorBold = styled.span`
  font-weight: bold;
`

export const NoResultsMessage = styled.p`
  text-align: center;
  padding: 15px;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  border-radius: 8px;
  margin-top: 15px;
`

export const SectionTitle = styled.h2<PrimaryColorProps>`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ $primaryColor }) => $primaryColor || '#000000'};
  margin-bottom: 20px;
  border-bottom: 2px solid ${({ $primaryColor }) => $primaryColor || '#000000'};
  padding-bottom: 5px;
`

export const Input = styled.input<PrimaryColorProps>`
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  min-width: 150px;

  &:focus {
    border-color: ${({ $primaryColor }) => $primaryColor || '#000000'};
    box-shadow: 0 0 0 3px
      ${({ $primaryColor }) =>
        $primaryColor ? $primaryColor + '40' : 'rgba(0, 0, 0, 0.25)'};
    outline: none;
  }
`

export const SearchButton = styled(BaseButton)<PrimaryColorProps>`
  background-color: ${({ $primaryColor }) => $primaryColor || '#000000'};
  color: white;

  &:hover {
    filter: brightness(90%);
  }
`

export const CepAddressResult = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f7f2fb;
  border: 1px solid ${COLOR_CEP + '40'};
  border-left: 5px solid ${COLOR_CEP};
  border-radius: 8px;
  color: #333;

  p {
    margin: 5px 0;
  }
`

export const CepAddressSpan = styled.span`
  font-weight: bold;
  color: ${COLOR_CEP};
  margin-right: 8px;
`

export const ResultsArea = styled.div`
  margin-top: 25px;
`

export const FilterLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
`

export const ResultsCount = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 20px 0;
`

export const RepoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const RepoItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`

export const RepoLink = styled.a`
  font-weight: bold;
  color: ${COLOR_GITHUB};
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 5px;

  &:hover {
    text-decoration: underline;
    color: ${COLOR_GITHUB};
  }
`

export const RepoDescription = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin: 0;
`

export const Username = styled.span`
  font-weight: 700;
  color: ${COLOR_GITHUB};
`

export const CountriesResult = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f2fbf4;
  border: 1px solid ${COLOR_COUNTRIES + '40'};
  border-radius: 12px;
  text-align: center;
`

export const CountryFlag = styled.img`
  width: 100%;
  max-width: 120px;
  height: auto;
  margin: 0 auto 15px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`

export const CountriesName = styled.h4<PrimaryColorProps>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLOR_COUNTRIES};
  margin-bottom: 10px;
`

export const CountryDetail = styled.p`
  margin: 5px 0;
  font-size: 0.95rem;
  text-align: left;

  span {
    font-weight: 600;
    color: ${COLOR_COUNTRIES};
    margin-right: 5px;
  }
`

export const DetailGroup = styled.div`
  text-align: left;
  margin-top: 10px;
  padding: 0 10px;
`
export const LoadingMessage = styled.p`
  font-size: 1.1em;
  font-weight: 500;
  color: #888;
  padding: 15px 0;
  text-align: center;
  margin: 10px 0;
`
